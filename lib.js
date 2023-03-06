function init() {
    eLog = $('.status');
    WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => log("Error:" + err));
}
var eLog;

var colours = {
    "C":"#d5e0f9",
    "C#":"#ed7a30",
    "D":"#070670",
    "D#":"#f2a93b",
    "E":"#f6d548",
    "F":"#bdda4a",
    "F#":"#cb4274",
    "G":"#f3c151",
    "G#":"#72ab48",
    "A":"#9b2d21",
    "A#":"#e09265",
    "B":"#c4e493",
}

function log(msg) {
    console.log(msg);
    eLog.text(msg);
}

var notes = {

};

// Function triggered when WEBMIDI.js is ready
function onEnabled() {

    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
        log("No device detected.");
    } else {
      WebMidi.inputs.forEach((device, index) => {
        log(`Connected to MIDI device: ${device.name}`);

        device.channels[1].addListener("noteon", e => {
            let n = e.note.name;
            if(e.note.accidental)
                n += e.note.accidental;
            log(`Note pressed: ${n}`);
            notes[n] = true;
            $('body').css('background-color', colours[n]);
        });
        
        device.channels[1].addListener("noteoff", e => {
            let n = e.note.name;
            if(e.note.accidental)
                n += e.note.accidental;
            delete notes[n];
            if(Object.keys(notes).length == 0) {
                log("All notes off");
                $('body').css('background-color', 'white');
            }
        });
      });
    }

  }

$(init);