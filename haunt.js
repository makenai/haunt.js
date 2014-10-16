$(function() {

    console.log( "ready!" );

    var bgm = {};
    var sounds= {};

	function playBgm() {
		var bgmName = $("#bgm option:selected").text();
		if ( bgmName != "none" )
			bgm[ bgmName ].play();
	}

	function stopBgm() {
		$.each( bgm, function( name, sound ) {
			sound.stop();
		});
	}

	function stopSounds() {
		$.each( sounds, function( name, sound ) {
			sound.stop();
		});
	}

	function classify(str) {
		return str.replace(/[^A-Z0-9]/gi,'');
	}

    // Preload BGM
	$("#bgm > option").each(function() {
		bgm[ this.text ] = new Howl({
			urls: [ this.value ],
			loop: true,
  			volume: 0.25
		});
	});
	playBgm();

	// Trigger BGM change
	$("#bgm").change(function() {
		stopBgm();
		playBgm();
	});

	// Preload Sounds
	$("a.sound").each(function() {
		var soundName = $(this).text();
		$(this).attr('id', classify(soundName) );
		sounds[ soundName ] = new Howl({
			urls: [ $(this).data('sound') ],
			onend: function() {
				$('#' + classify(soundName) ).removeClass('playing');
			},
			onload: function() {
				$('#' + classify(soundName) ).addClass('playable');
			}
		});
		if ($(this).data('pos')) {
			var pos = $(this).data('pos').split(',');
			sounds[ soundName ].pos3d( pos[0], pos[1], pos[2] );
		}
	});

	// Click to play
	$("a.sound").click(function() {
		var soundName = $(this).text();
		if ( $(this).hasClass('playing') ) {
			$(this).removeClass("playing");
			sounds[ soundName ].stop();						
		} else {
			$(this).addClass("playing");
			sounds[ soundName ].play();
		}
	});

});