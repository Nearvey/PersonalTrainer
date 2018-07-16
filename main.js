//Anchor script//

$(document).ready(function () {

    $('a[href^="#"]').on('click', function (event) {

        var target = $($(this).attr('href'));
        console.log(event.target, this)

        if (target.length) {
            event.preventDefault();
            var top = target.offset().top;
            $('html, body').animate({
                scrollTop: top < 100 ? top : top - 0
            }, 1000);
        }
    });

});

//Email scrip

var $contactForm = $('#contact-form');

$contactForm.submit(function (e) {
    e.preventDefault();
    var $submit = $('input:submit', $contactForm);
    var defaultSubmitText = $submit.val();

    $.ajax({
        url: '//formspree.io/piter.gryx@gmail.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        beforeSend: function () {
            //$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
            $submit.attr('disabled', true).val('Wysyłanie wiadomości...');
        },
        success: function (data) {
            //$contactForm.append('<div class="alert alert--success">Message sent!</div>');
            $submit.val('Wiadomość wysłana!');
            setTimeout(function () {
                //$('.alert--success').remove();
                $submit.attr('disabled', false).val(defaultSubmitText);
            }, 5000);
        },
        error: function (err) {
            //$contactForm.find('.alert--loading').hide();
            //$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
            $submit.val('Ups, wystąpił problem.');
            setTimeout(function () {
                //$('.alert--error').remove();
                $submit.attr('disabled', false).val(defaultSubmitText);
            }, 5000);
        }
    });
});
