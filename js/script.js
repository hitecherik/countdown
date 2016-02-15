(function() {
	var $time = $("#time"),
		$timeParent = $time.parent(),
		$window = $(window),
		paused = false,
		complete = false;
	
	$window.on("resize", function() {
		$time.bigText();
	}).on("click", function() {
		if (complete) {
			window.location.reload();
		} else {
			paused = !paused;
			$timeParent.toggleClass("paused");
		}
	}).trigger("resize");

	function populate(seconds) {
		var time = {
				hours: "00",
				minutes: "00",
				seconds: "0" + (seconds % 60).toString()
			};
		
		seconds -= parseInt(time.seconds);
		time.minutes = "0" + ((seconds / 60) % 60).toString();
		seconds -= parseInt(time.minutes) * 60;
		time.hours = "0" + (seconds / 3600).toString();
		
		return time.hours.substr(-2) + ":" + time.minutes.substr(-2) + ":" + time.seconds.substr(-2);
	}

	window.onload = function() {
		var seconds = (parseFloat(prompt("How many minutes are you counting down?")) * 60) || 0,
			interval;
		
		$time.html(populate(seconds));
		
		interval = setInterval(function() {
			if (seconds === 0) {
				$window.trigger("click");
				complete = true;
				clearInterval(interval);
			} else {
				seconds -= (paused ? 0 : 1);
				$time.html(populate(seconds));
			}
		}, 1000);
	}
})();