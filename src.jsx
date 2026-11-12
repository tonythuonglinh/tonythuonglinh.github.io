import React,{useEffect,useState,useRef} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowLeft,KeyRound,LockKeyhole,Heart,CalendarDays}from'lucide-react';
import './style.css';
const images=import.meta.glob('./assets/*',{eager:true,query:'?url',import:'default'});
const assetUrl=path=>{
 const url=images[`./assets/${path.replace(/^\//,'')}`];
 if(!url)throw new Error(`Missing image: ${path}`);
 return url;
};
function isTrophyMoment(value){
 const words=value.toLowerCase().normalize('NFKD').replace(/[^a-z\s]/g,' ').split(/\s+/).filter(Boolean);
 // Accept the requested short answers as well as small spelling mistakes.
 const closeToTrophy=word=>{
  const target='trophy';
  if(Math.abs(word.length-target.length)>1)return false;
  let previous=Array.from({length:target.length+1},(_,i)=>i);
  for(let i=0;i<word.length;i++){
   const current=[i+1];
   for(let j=0;j<target.length;j++)current[j+1]=Math.min(current[j]+1,previous[j+1]+1,previous[j]+(word[i]===target[j]?0:1));
   previous=current;
  }
  return previous[target.length]<=1;
 };
 const hasTrophy=words.some(word=>closeToTrophy(word)||['trophies','trophie','cup','summoners'].includes(word));
 const hasHead=words.some(word=>['head','forehead','face','himself'].includes(word));
 const hasImpact=words.some(word=>/^(hit|hits|hitting|bonk|bonks|bonked|bonking|bump|bumps|bumped|bumping|smack|smacked|hurt|injured)$/.test(word));
 return hasTrophy||(hasHead&&hasImpact);
}
const questions=[
 {q:"What's Zeus' real name?",answer:v=>/^choi\s+woo[\s-]*je$/i.test(v.trim().replace(/\s+/g,' ')),placeholder:'First and last name'},
 {q:"When is Zeus' birthday?",type:'date',answer:v=>v==='2004-01-31'},
 {q:"What's an unforgettable moment in 2024 after Zeus winning worlds?",answer:isTrophyMoment,placeholder:'What happened?'},
 {q:'Against KT Rolster on August 24, 2024, Zeus got his first career Pentakill. Which champion did he play?',answer:v=>v.trim().toLowerCase()==='olaf',placeholder:'Champion'},
 {q:'How many times had Zeus won LCK Top-Laner of the Year?',type:'number',answer:v=>v.trim()==='3',placeholder:'Number'},
 {q:'Zeus’ most-played champion has 94 games, a 68.1% win rate and a KDA of 3. Which champion is it?',answer:v=>v.trim().toLowerCase()==='gnar',placeholder:'Champion'},
 {q:"Which player is Zeus' role model?",answer:v=>v.trim().toLowerCase()==='nuguri',placeholder:'Player name'},
 {q:'What was Zeus’ IGN on his NA account during Worlds this year?',answer:v=>/^austin(?:\s*#\s*lll)?$/i.test(v.trim()),placeholder:'Summoner name'},
 {q:"Who's the biggest Zeus fan?",answer:v=>['linh','me','penny','hoa linh','em be','em','em yeu'].includes(v.trim().toLowerCase().replace(/\s+/g,' ')),placeholder:'Your answer'},
];
const bonuses={
 6:{tag:'ROLE MODEL',title:'Nuguri',roleModelPhoto:assetUrl('/zeus-nuguri.png'),quote:'Nuguri is gone, but we have Zeus',attribution:'NoFe, 2021'},
 0:{tag:'CORRECT ANSWER',title:'Not bad, not bad.',gif:assetUrl('/zeus-stage.gif'),alt:'Zeus giving a cheeky reaction on stage',reaction:true},
 4:{tag:'CORRECT ANSWER',title:'Zeus is the GOAT',gif:assetUrl('/zeus-proud.gif'),alt:'Zeus spreading his arms proudly on stage',reaction:true},
 2:{tag:'THE TROPHY MOMENT',title:'Bonk.',gif:assetUrl('/zeus-trophy.gif')},
 3:{tag:'HIGHLIGHT',title:"... AND THERE'S THE PENTA FOR OLAF TOP FROM ZEUS!!!",video:'DJAwbQe0f1w'},
 5:{tag:'CHAMPION STATS',title:"Gnar, Jayce & K'Sante",text:'A closer look at three of his champion picks.',stats:[{name:'Gnar',games:94,win:'68.1%'},{name:'Jayce',games:74,win:'74.3%'},{name:"K'Sante",games:63,win:'61.9%'}]}
};
function BonusCard({index,onContinue}){const bonus=bonuses[index];return <section className={'bonus-screen '+(bonus.video?'bonus-video':'')} aria-labelledby="bonus-title"><span className="overline">{bonus.tag}</span><h1 id="bonus-title">{bonus.title}</h1>{bonus.text&&<p className="bonus-copy">{bonus.text}</p>}{bonus.gif&&<img className="trophy-gif" src={bonus.gif} alt={bonus.alt||"Zeus lifting the trophy and accidentally hitting his head"}/>}{bonus.photo&&<img className="reaction-photo" src={bonus.photo} alt={bonus.alt}/ >}{bonus.video&&<div className="clip-wrap"><iframe src={`https://www.youtube-nocookie.com/embed/${bonus.video}`} title="Zeus gets his first Pentakill on Olaf — LCK Global" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/><a href={`https://www.youtube.com/shorts/${bonus.video}`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>}{bonus.stats&&<div className="champion-stats">{bonus.stats.map((champ,i)=><div className="champion-row" key={champ.name}><div className="champion-label"><strong>{champ.name}</strong><span>{champ.games} games</span></div><div className="champion-bar" aria-hidden="true"><i style={{width:`${champ.games/Math.max(...bonus.stats.map(champ=>champ.games))*100}%`,animationDelay:`${i*.12}s`}}/></div><span className="champion-win">{champ.win} win rate</span></div>)}</div>}{bonus.roleModelPhoto&&<img className="role-model-photo" src={bonus.roleModelPhoto} alt="Zeus and his role model Nuguri wearing headsets during competition" width="1200" height="800"/>}{bonus.quote&&<blockquote className="role-model-quote"><p>"{bonus.quote}"</p><cite>- {bonus.attribution}</cite></blockquote>}{bonus.detail&&<p className="bonus-detail">{bonus.detail}</p>}{bonus.source&&<a className="bonus-source" href={bonus.source} target="_blank" rel="noreferrer">{bonus.stats?'View stats source':'Fact source'} ↗</a>}<button className="continue bonus-next" onClick={onContinue}>{index===questions.length-1?'Open my surprise':'Next question'}</button></section>}
const notes=[
 'Did I tell you that your eyes really shine when you talk about Zeus? :p',
 'My heart is always filled with pure joy when I see you just being yourself.',
 "I really cherish every little moment we have together. And you don't know how much I like it when I see you smile, when I hear you giggle about some silly TikToks or you do a funny dance when you eat some good food.",
 "I know life is rough sometimes and there are times where you just want to disappear and be alone and just sulk for yourself. But I think it's always better to have someone you still can rely on, even on the worst days. Right?",
 "And that's what I want to be for you. I want to be the person you can always rely on, no matter what. And I want you to be the person I can always rely on.",
 "That's why... I want to ask you something."
];
const noMessages=['No','Nope!','Still no?','No, you did not!','Stop pressing me :p','No means... smaller?','Nope, shrinking away','Stop, I need my pixels!','No more clicks, pls','Tiny button, big NO','Nooo, spare my pixels!','Stop poking the tiny no!'];
function App(){const[index,setIndex]=useState(0),[answer,setAnswer]=useState(''),[error,setError]=useState(''),[phase,setPhase]=useState('quiz'),[note,setNote]=useState(0),[no,setNo]=useState(0),[replaying,setReplaying]=useState(false);const mainRef=useRef(null);const romantic=phase==='notes'||phase==='proposal'||phase==='yes';const warmth=phase==='notes'? (note+1)/notes.length :romantic?1:0;
 useEffect(()=>{mainRef.current?.focus();window.scrollTo({top:0,behavior:'instant'})},[phase,index,note]);
 useEffect(()=>{if(phase!=='key')return;const t=setTimeout(()=>{setPhase('notes');setNote(0)},2400);return()=>clearTimeout(t)},[phase]);
 function submit(e){e.preventDefault();if(!questions[index].answer(answer)){setError('Not quite — give it another try.');return}finishQuestion()}
 function finishQuestion(skipped=false){setError('');setAnswer('');if(bonuses[index]&&!(skipped&&bonuses[index].reaction))setPhase('bonus');else nextQuestion()}
 function nextQuestion(){if(index===questions.length-1)setPhase('key');else{setIndex(i=>i+1);setPhase('quiz')}}
 function nextNote(){if(note===notes.length-1)setPhase(replaying?'yes':'proposal');else setNote(n=>n+1)}
 function replayNotes(){setReplaying(true);setNote(0);setPhase('notes')}
 const hearts=Array.from({length:17},(_,i)=>({left:(i*43+9)%100,delay:(i*1.13)%11,size:12+i%4*5}));
 return <div className={'app '+(romantic?'romantic':'esports')} style={{'--warmth':warmth}}><div className="background-noise"/><div className="hearts" aria-hidden="true">{romantic&&hearts.map((h,i)=><span key={i} style={{left:h.left+'%',fontSize:h.size,animationDelay:`-${h.delay}s`}}>♥</span>)}</div>
 <header className="site-header"><div className="header-right">{phase==='quiz'?`QUESTION ${String(index+1).padStart(2,'0')} / ${String(questions.length).padStart(2,'0')}`:phase==='notes'?`${String(note+1).padStart(2,'0')} / ${String(notes.length).padStart(2,'0')}`:''}</div></header>
 <main ref={mainRef} tabIndex={-1}>
 {phase==='bonus'&&<BonusCard index={index} onContinue={nextQuestion}/>}
 {phase==='quiz'&&<section className="quiz-layout" key={index}><div className="quiz-side"><span className="overline">a little zeus quiz</span><h1>Think you know<br/><em>Zeus?</em></h1><p>Nine questions. One unlock.</p><div className="progress"><div style={{width:`${index/questions.length*100}%`}}/></div><span className="progress-label">{index} OF {questions.length} COMPLETE</span><figure className="quiz-portrait"><img src={assetUrl(index%2===0?'/zeus-champion.jpg':'/zeus-night.jpg')} alt={index%2===0?'Zeus celebrating with confetti':'Zeus making his signature pose at night'} width="320" height="220"/><figcaption>{index===questions.length-1?'His biggest fan is taking this quiz.':index%2===0?'Your favourite top laner. No pressure.':'Zeus is watching. You got this.'}</figcaption></figure></div><div className="quiz-card"><div className="card-head"><span className="square-number">{String(index+1).padStart(2,'0')}</span><span>QUESTION {String(index+1).padStart(2,'0')}</span><LockKeyhole size={16}/></div><h2>{questions[index].q}</h2><form onSubmit={submit}><label htmlFor="answer">YOUR ANSWER</label><div className="input-wrap">{questions[index].type==='date'?<><CalendarDays size={19}/><input id="answer" aria-label="Select Zeus' birthday" type="date" value={answer} onChange={e=>{setAnswer(e.target.value);setError('')}} required/></>:<input id="answer" autoComplete="off" type={questions[index].type==='number'?'number':'text'} value={answer} placeholder={questions[index].placeholder} onChange={e=>{setAnswer(e.target.value);setError('')}} required/>}</div>{error&&<div className="error" role="alert">{error}</div>}<button className="continue" type="submit">{index===questions.length-1?'Unlock':'Check answer'}</button><button className="skip-question" type="button" onClick={()=>finishQuestion(true)}>Skip question</button></form></div></section>}
 {phase==='key'&&<section className="key-screen" key="key"><span className="overline">{questions.length} / {questions.length} COMPLETE</span><div className="key-icon"><KeyRound size={75} strokeWidth={1.6}/></div><h1>Unlocked.</h1><p>There's something else I wanted to tell you.</p><div className="key-loading"><div/></div></section>}
 {phase==='notes'&&<section className="note-screen" key={note}>{note===0?<img className="note-bear" src={assetUrl("/bear-heart.png")} alt="Bear holding a pink heart"/>:note===1?<img className="note-bear" src={assetUrl("/bunny-rose.png")} alt="Bunny holding a rose"/>:note===2?<img className="note-couple" src={assetUrl("/bunny-bear.png")} alt="Bunny and bear sharing a heart"/>:<img className="note-bear" src={assetUrl("/bear-letter.png")} alt="Bear with a love letter"/>}<h1 className={notes[note].length>140?'long-note':undefined}>{notes[note]}</h1><div className="note-actions">{note>0&&<button className="back" onClick={()=>setNote(n=>n-1)} aria-label="Previous message"><ArrowLeft size={19}/></button>}<button className="continue pink" onClick={nextNote}>Continue</button></div><div className="note-dots">{notes.map((_,i)=><i key={i} className={i===note?'active':''}/>)}</div></section>}
 {phase==='proposal'&&<section className="proposal-screen" key="proposal"><span className="note-index">ONE LAST QUESTION</span><img className="proposal-bear" src={assetUrl("/bear-heart.png")} alt="Bear holding a pink heart"/><h1>Do you want to be my<br/><em>girlfriend?</em></h1><div className="proposal-buttons"><button className="continue pink yes" style={{fontSize:13+Math.min(no,10)*2,padding:`${16+Math.min(no,10)*3}px ${28+Math.min(no,10)*5}px`}} onClick={()=>setPhase('yes')}>Yes <Heart size={18}/></button><button className="no" onClick={()=>setNo(n=>n+1)} style={{transform:`scale(${Math.max(.25,1-no*.07)})`}}>{noMessages[Math.min(no,noMessages.length-1)]}</button></div></section>}
 {phase==='yes'&&<section className="yes-screen" key="yes"><span className="note-index">♡</span><h1>Now kiss me.</h1><img src={assetUrl("/bunny-cat.png")} alt="Bunny and cat sharing a heart"/><div className="last-heart">♥</div><button className="continue pink replay-messages" onClick={replayNotes}><Heart size={18}/> Read the messages again</button></section>}
 </main></div>}
createRoot(document.getElementById('root')).render(<App/>);
