$("nav a").click(function(event) {
	$(".link-wrap").removeClass("open-nav");
	$(".NavClass").removeClass("openMainNav");

	var id = $(this).attr("href");
	var offset = 50;
	var target = $(id).offset().top - offset;

	$("html, body").animate(
		{
			scrollTop: target
		}, 
		800
	);
	event.preventDefault();
});

$(".mobile-toggle").click(function() {
	if ($(".link-wrap").hasClass("open-nav")) {
		$(".link-wrap").removeClass("open-nav");
		$(".NavClass").removeClass("openMainNav");
	} else {
		$(".link-wrap").addClass("open-nav");
		$(".NavClass").addClass("openMainNav");
	}
});

$(window).resize(function() {
	if ($(window).width() > 905) {
		$(".link-wrap").removeClass("open-nav");
		$(".NavClass").removeClass("openMainNav");
	}
});

// -------------------- Sending mail -------------------