// Init SpeechSynth API
const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
// Init Voices Array

let voices = [];

const getVoices = ()=>{
    voices = synth.getVoices();
    // console.log(voices);

    voices.forEach(voice =>{
        ///Create an option element
        const option = document.createElement('option');
        /// Fill with voice and language
        option.textContent = voice.name + '('+voice.lang +')';

        //Set needed option attribute

        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    })

}


getVoices();

if( synth.onvoiceschanged !== undefined)
{
    synth.onvoiceschanged = getVoices;

}



const speak = ()=>{

    body.style.background =  '#141414  url(../img/wave.gif)'
    body.style.backgroundRepeat = 'repeat-x'
    // body.style.backgroundSize = '100% 100%'
    //Check if speaking
    if(synth.speaking)
    {
        console.error('Already Speaking')
        return;
    }

    if(textInput.value !=='')
    {
        const speakText  = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e=>{
            console.log('Done Speaking...');
            body.style.background = '#141414';
        }


        speakText.onerror = e=>{
            console.error('Something Went Wrong');
        }


        //Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Lopp through voices

        voices.forEach(voice=>{
            if(voice.name === selectedVoice)
            {
                speakText.voice = voice
            }
        });

        ///Set pitch and rate

        speakText.rate = rate.value;
        speakText.pitch = pitch.value


        //Speak

        synth.speak(speakText);
    }
}



///Event listener


//Text form submit

textForm.addEventListener('submit', e=>{
    e.preventDefault();

    speak();
    textInput.blur();
})


rate.addEventListener('change',e=> rateValue.textContent=rate.value)

pitch.addEventListener('change',e=>pitchValue = pitch.value)

//Voice select change
voiceSelect.addEventListener('change',e=> speak());