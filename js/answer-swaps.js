/**
 * jspsych-answer_swaps
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["answer_swaps"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('answer_swaps', 'stimulus', 'image');

  plugin.info = {
    name: 'answer_swaps',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
      },
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image height',
        default: null,
        description: 'Set the image height in pixels'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image width',
        default: null,
        description: 'Set the image width in pixels'
      },
      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEY,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
      render_on_canvas: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Render on canvas',
        default: true,
        description: 'If true, the image will be drawn onto a canvas element (prevents blank screen between consecutive images in some browsers).'+
          'If false, the image will be shown via an img element.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var height, width;



      // display stimulus as an image element

      var html = '<img style = "padding-right: 20px;" src="Stimuli/response-box.png" id="response_box1">';
      html +=  '<img style = "padding-right: 20px;" src="Stimuli/response-box.png" id="response_box2">';
      html +=  '<img style = "padding-right: 20px;" src="Stimuli/response-box.png" id="response_box3">';
      html +=  '<img style = "padding-right: 20px;" src="Stimuli/response-box.png" id="response_box4">';
      html +=  '<img style = "padding-right: 20px;" src="Stimuli/response-box.png" id="response_box5">';
      html += '<br><br><br><br><br>'

       html +=  '<img style = "padding-right: 20px;" src="'+trial.stimulus[0]+'" id="jspsych-answer_swaps-stimulus1">';
       html += '<img style = "padding-right: 20px;" src="'+trial.stimulus[1]+'" id="jspsych-answer_swaps-stimulus2">';
       html += '<img style = "padding-right: 20px;" src="'+trial.stimulus[2]+'" id="jspsych-answer_swaps-stimulus3">';
       html += '<img style = "padding-right: 20px;" src="'+trial.stimulus[3]+'" id="jspsych-answer_swaps-stimulus4">';
       html += '<img style = "padding-right: 20px;" src="'+trial.stimulus[4]+'" id="jspsych-answer_swaps-stimulus5"><br><br><br><br>';
       html += '<button class = "btn" id = "submitbutton"> Submit</button>'
       html += '<br><br><button class = "btn reset"> Reset</button>'
      // add prompt
      if (trial.prompt !== null){
        html += trial.prompt;
      }
      html += '<div><br><br> <p>Drag the shapes to their correct position</p></div>'
      // update the page content
      display_element.innerHTML = html;

      // set image dimensions after image has loaded (so that we have access to naturalHeight/naturalWidth)
      var img1 = display_element.querySelector('#jspsych-answer_swaps-stimulus1');
      var img2 = display_element.querySelector('#jspsych-answer_swaps-stimulus2');
      var img3 = display_element.querySelector('#jspsych-answer_swaps-stimulus3');
      var img4 = display_element.querySelector('#jspsych-answer_swaps-stimulus4');
      var img5 = display_element.querySelector('#jspsych-answer_swaps-stimulus5');

      var img6 = display_element.querySelector('#response_box1');
      var img7 = display_element.querySelector('#response_box2');
      var img8 = display_element.querySelector('#response_box3');
      var img9 = display_element.querySelector('#response_box4');
      var img10 = display_element.querySelector('#response_box5');

      if (trial.stimulus_height !== null) {
        height = trial.stimulus_height;
        if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
          width = img1.naturalWidth * (trial.stimulus_height/img1.naturalHeight);
        }
      } else {
        height = img1.naturalHeight;
      }
      if (trial.stimulus_width !== null) {
        width = trial.stimulus_width;
        if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
          height = img1.naturalHeight * (trial.stimulus_width/img.naturalWidth);
        }
      } else if (!(trial.stimulus_height !== null & trial.maintain_aspect_ratio)) {
        // if stimulus width is null, only use the image's natural width if the width value wasn't set
        // in the if statement above, based on a specified height and maintain_aspect_ratio = true
        width = img1.naturalWidth;
      }
      img1.style.height = height.toString() + "px";
      img1.style.width = width.toString() + "px";
      img2.style.height = height.toString() + "px";
      img2.style.width = width.toString() + "px";
      img3.style.height = height.toString() + "px";
      img3.style.width = width.toString() + "px";
      img4.style.height = height.toString() + "px";
      img4.style.width = width.toString() + "px";
      img5.style.height = height.toString() + "px";
      img5.style.width = width.toString() + "px";

      img6.style.height = "250px";
      img6.style.width = "250px";
      img7.style.height = "250px";
      img7.style.width = "250px";
      img8.style.height = "250px";
      img8.style.width = "250px";
      img9.style.height = "250px";
      img9.style.width = "250px";
      img10.style.height = "250px";
      img10.style.width = "250px";


      // start time
         var start_time = performance.now();



// draggable

$( function() {

$("#submitbutton").hide();

   $('#response_box1').droppable({
     drop: handleDropEvent_1
   });
   $('#response_box2').droppable({
     drop: handleDropEvent_2
   });
   $('#response_box3').droppable({
     drop: handleDropEvent_3
   });
   $('#response_box4').droppable({
     drop: handleDropEvent_4
   });
   $('#response_box5').droppable({
     drop: handleDropEvent_5
   });
  $( "#jspsych-answer_swaps-stimulus1").draggable({
     helper: 'original',
     revert: "invalid"
  });
  $( "#jspsych-answer_swaps-stimulus2").draggable({
    helper: 'original',
    revert: "invalid"
  });
  $( "#jspsych-answer_swaps-stimulus3").draggable({
    helper: 'original',
    revert: "invalid"
  });
  $( "#jspsych-answer_swaps-stimulus4").draggable({
    helper: 'original',
    revert: "invalid"
  });
  $( "#jspsych-answer_swaps-stimulus5").draggable({
    helper: 'original',
    revert: "invalid"
  });
} );


response1 = 0;
response2 = 0;
response3 = 0;
response4 = 0;
response5 = 0;


function handleDropEvent_1( event, ui ) {
  var draggable = ui.draggable;
  response1 = 1;
 $('#response_box1').droppable("option", "disabled", true)
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus1") {$('#jspsych-answer_swaps-stimulus1').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus2") {$('#jspsych-answer_swaps-stimulus2').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus3") {$('#jspsych-answer_swaps-stimulus3').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus4") {$('#jspsych-answer_swaps-stimulus4').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus5") {$('#jspsych-answer_swaps-stimulus5').draggable("option", "disabled", true)}
 if(response1 == 1 & response2 == 1 & response3 == 1 & response4 == 1 & response5 == 1){$("#submitbutton").show()}
 selection1 = draggable.attr('id')
 if(selection1 == "jspsych-answer_swaps-stimulus1"){selection1 = trial.stimulus[0]} else
 if(selection1 == "jspsych-answer_swaps-stimulus2"){selection1 = trial.stimulus[1]} else
 if(selection1 == "jspsych-answer_swaps-stimulus3"){selection1 = trial.stimulus[2]} else
 if(selection1 == "jspsych-answer_swaps-stimulus4"){selection1 = trial.stimulus[3]} else
 if(selection1 == "jspsych-answer_swaps-stimulus5"){selection1 = trial.stimulus[4]}
}


function handleDropEvent_2( event, ui ) {
  var draggable = ui.draggable;
  response2 = 1;
 $('#response_box2').droppable("option", "disabled", true)
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus1") {$('#jspsych-answer_swaps-stimulus1').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus2") {$('#jspsych-answer_swaps-stimulus2').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus3") {$('#jspsych-answer_swaps-stimulus3').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus4") {$('#jspsych-answer_swaps-stimulus4').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus5") {$('#jspsych-answer_swaps-stimulus5').draggable("option", "disabled", true)}
 if(response1 == 1 & response2 == 1 & response3 == 1 & response4 == 1 & response5 == 1){$("#submitbutton").show()}
 selection2 = draggable.attr('id')
 if(selection2 == "jspsych-answer_swaps-stimulus1"){selection2 = trial.stimulus[0]} else
 if(selection2 == "jspsych-answer_swaps-stimulus2"){selection2 = trial.stimulus[1]} else
 if(selection2 == "jspsych-answer_swaps-stimulus3"){selection2 = trial.stimulus[2]} else
 if(selection2 == "jspsych-answer_swaps-stimulus4"){selection2 = trial.stimulus[3]} else
 if(selection2 == "jspsych-answer_swaps-stimulus5"){selection2 = trial.stimulus[4]}
}

function handleDropEvent_3( event, ui ) {
  var draggable = ui.draggable;
  response3 = 1;
 $('#response_box3').droppable("option", "disabled", true)
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus1") {$('#jspsych-answer_swaps-stimulus1').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus2") {$('#jspsych-answer_swaps-stimulus2').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus3") {$('#jspsych-answer_swaps-stimulus3').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus4") {$('#jspsych-answer_swaps-stimulus4').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus5") {$('#jspsych-answer_swaps-stimulus5').draggable("option", "disabled", true)}
 if(response1 == 1 & response2 == 1 & response3 == 1 & response4 == 1 & response5 == 1){$("#submitbutton").show()}
 selection3 = draggable.attr('id')
 if(selection3 == "jspsych-answer_swaps-stimulus1"){selection3 = trial.stimulus[0]} else
 if(selection3 == "jspsych-answer_swaps-stimulus2"){selection3 = trial.stimulus[1]} else
 if(selection3 == "jspsych-answer_swaps-stimulus3"){selection3 = trial.stimulus[2]} else
 if(selection3 == "jspsych-answer_swaps-stimulus4"){selection3 = trial.stimulus[3]} else
 if(selection3 == "jspsych-answer_swaps-stimulus5"){selection3 = trial.stimulus[4]}
}

function handleDropEvent_4( event, ui ) {
  var draggable = ui.draggable;
  response4 = 1;
 $('#response_box4').droppable("option", "disabled", true)
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus1") {$('#jspsych-answer_swaps-stimulus1').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus2") {$('#jspsych-answer_swaps-stimulus2').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus3") {$('#jspsych-answer_swaps-stimulus3').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus4") {$('#jspsych-answer_swaps-stimulus4').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus5") {$('#jspsych-answer_swaps-stimulus5').draggable("option", "disabled", true)}
 if(response1 == 1 & response2 == 1 & response3 == 1 & response4 == 1 & response5 == 1){$("#submitbutton").show()}
 selection4 = draggable.attr('id')
 if(selection4 == "jspsych-answer_swaps-stimulus1"){selection4 = trial.stimulus[0]} else
 if(selection4 == "jspsych-answer_swaps-stimulus2"){selection4 = trial.stimulus[1]} else
 if(selection4 == "jspsych-answer_swaps-stimulus3"){selection4 = trial.stimulus[2]} else
 if(selection4 == "jspsych-answer_swaps-stimulus4"){selection4 = trial.stimulus[3]} else
 if(selection4 == "jspsych-answer_swaps-stimulus5"){selection4 = trial.stimulus[4]}
}

function handleDropEvent_5( event, ui ) {
  var draggable = ui.draggable;
  response5 = 1;
 $('#response_box5').droppable("option", "disabled", true)
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus1") {$('#jspsych-answer_swaps-stimulus1').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus2") {$('#jspsych-answer_swaps-stimulus2').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus3") {$('#jspsych-answer_swaps-stimulus3').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus4") {$('#jspsych-answer_swaps-stimulus4').draggable("option", "disabled", true)}
 if(draggable.attr('id') == "jspsych-answer_swaps-stimulus5") {$('#jspsych-answer_swaps-stimulus5').draggable("option", "disabled", true)}
 if(response1 == 1 & response2 == 1 & response3 == 1 & response4 == 1 & response5 == 1){$("#submitbutton").show()}
 selection5 = draggable.attr('id')
 if(selection5 == "jspsych-answer_swaps-stimulus1"){selection5 = trial.stimulus[0]} else
 if(selection5 == "jspsych-answer_swaps-stimulus2"){selection5 = trial.stimulus[1]} else
 if(selection5 == "jspsych-answer_swaps-stimulus3"){selection5 = trial.stimulus[2]} else
 if(selection5 == "jspsych-answer_swaps-stimulus4"){selection5 = trial.stimulus[3]} else
 if(selection5 == "jspsych-answer_swaps-stimulus5"){selection5 = trial.stimulus[4]}
}



function handleDropEvent_RIGHT( event, ui ) {
  var draggable = ui.draggable;
  //alert( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
  if(draggable.attr('id') == "jspsych-bongard-key-stimulus1"){$("#stim1_indicator").text("R");stim1_lock = 1; R1 = "R"}
  if(draggable.attr('id') == "jspsych-bongard-key-stimulus2"){$("#stim2_indicator").text("R");stim2_lock = 1; R2 = "R"}
  if(draggable.attr('id') == "jspsych-bongard-key-stimulus3"){$("#stim3_indicator").text("R");stim3_lock = 1; R3 = "R"}
  if(stim1_lock == 1 & stim2_lock == 1 & stim3_lock == 1){
    $("#jspsych-bongard-drag-button-0").show();

  }
}

// Reset button

$("#jspsych-answer_swaps-stimulus1").data({
    'originalLeft': $("#jspsych-answer_swaps-stimulus1").css('left'),
    'origionalTop': $("#jspsych-answer_swaps-stimulus1").css('top')
});

$("#jspsych-answer_swaps-stimulus2").data({
    'originalLeft': $("#jspsych-answer_swaps-stimulus2").css('left'),
    'origionalTop': $("#jspsych-answer_swaps-stimulus2").css('top')
});

$("#jspsych-answer_swaps-stimulus3").data({
    'originalLeft': $("#jspsych-answer_swaps-stimulus3").css('left'),
    'origionalTop': $("#jspsych-answer_swaps-stimulus3").css('top')
});

$("#jspsych-answer_swaps-stimulus4").data({
    'originalLeft': $("#jspsych-answer_swaps-stimulus4").css('left'),
    'origionalTop': $("#jspsych-answer_swaps-stimulus4").css('top')
});

$("#jspsych-answer_swaps-stimulus5").data({
    'originalLeft': $("#jspsych-answer_swaps-stimulus5").css('left'),
    'origionalTop': $("#jspsych-answer_swaps-stimulus5").css('top')
});

$(".reset").click(function() {
    $("#jspsych-answer_swaps-stimulus1").css({
        'left': $("#jspsych-answer_swaps-stimulus1").data('originalLeft'),
        'top': $("#jspsych-answer_swaps-stimulus1").data('origionalTop')
    });

    $("#jspsych-answer_swaps-stimulus2").css({
        'left': $("#jspsych-answer_swaps-stimulus2").data('originalLeft'),
        'top': $("#jspsych-answer_swaps-stimulus2").data('origionalTop')
    });

    $("#jspsych-answer_swaps-stimulus3").css({
        'left': $("#jspsych-answer_swaps-stimulus3").data('originalLeft'),
        'top': $("#jspsych-answer_swaps-stimulus3").data('origionalTop')
    });

    $("#jspsych-answer_swaps-stimulus4").css({
        'left': $("#jspsych-answer_swaps-stimulus4").data('originalLeft'),
        'top': $("#jspsych-answer_swaps-stimulus4").data('origionalTop')
    });

    $("#jspsych-answer_swaps-stimulus5").css({
        'left': $("#jspsych-answer_swaps-stimulus5").data('originalLeft'),
        'top': $("#jspsych-answer_swaps-stimulus5").data('origionalTop')
    });

    $('#jspsych-answer_swaps-stimulus1').draggable("option", "disabled", false)
    $('#jspsych-answer_swaps-stimulus2').draggable("option", "disabled", false)
    $('#jspsych-answer_swaps-stimulus3').draggable("option", "disabled", false)
    $('#jspsych-answer_swaps-stimulus4').draggable("option", "disabled", false)
    $('#jspsych-answer_swaps-stimulus5').draggable("option", "disabled", false)

    $('#response_box1').droppable("option", "disabled", false)
    $('#response_box2').droppable("option", "disabled", false)
    $('#response_box3').droppable("option", "disabled", false)
    $('#response_box4').droppable("option", "disabled", false)
    $('#response_box5').droppable("option", "disabled", false)

    response1 = 0;
    response2 = 0;
    response3 = 0;
    response4 = 0;
    response5 = 0;

    $("#submitbutton").hide();


});




$("#submitbutton").click(function() {
  selections = [selection1, selection2, selection3, selection4, selection5]
after_response();
})

    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // measure rt
      var end_time = performance.now();
      var rt = end_time - start_time;


      // gather the data to store for the trial
      var trial_data = {
        rt: rt,
        stimulus: trial.stimulus,
        response: selections
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {


      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      //display_element.querySelector('#jspsych-answer_swaps-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-answer_swaps-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    } else if (trial.response_ends_trial === false) {
      console.warn("The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true.");
    }
  };

  return plugin;
})();
