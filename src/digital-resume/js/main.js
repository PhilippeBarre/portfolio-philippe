/**
 * Object DIGITAL_RESUME contains main functions
 */
DIGITAL_RESUME = {
    /**
     * object setup contains all variables
     */
    setup: {
        id_go_down: '#go-down',
        id_first_page: '#about-me',
        id_auto_typed: "#auto-typed",
        id_btn_submit: "#btn-send",
        id_contact_firstname: '#firstname',
        id_contact_lastname: '#lastname',
        id_contact_email: '#email',
        id_contact_message: '#message',

        class_collapsible: '.collapsible',
        class_must_be_validate: '.validated',

        url_ajax: 'ajaxContact.php',

        auto_typed_strings: [
            "Hi.",
            "I'm Philippe.",
            "I'm 21 years old.",
            "I'm an IT student at Epitech Nancy.",
            "I'm a self-employed.",
            "I like mountain biking and weight training.",
            "And of course I fond of the programming.",
            "Okay now you can continue to scroll.",
        ]
    },

    /**
     * Initialize
     */
    init: function() {
        let self = this;
        $(self.setup.class_collapsible).collapsible();
        self.bindAll();
        self.initAutoTyped();
        self.setHeightTimelineItems();
    },

    /**
     * bind all events to buttons or other html elements
     */
    bindAll: function() {
        let self = this;
        // Button go down on the home page
        $(self.setup.id_go_down).click(function() {
            self.goDown();
        });

        // Validate contact form
        $(self.setup.class_must_be_validate).on('blur', function(event) {
            self.checkAll(event);
        });

        // Btn submit
        $(self.setup.id_btn_submit).on('click', function(event) {
            M.toast({html: 'Feature only available on philippebarre.net :)'});
            self.ajaxSendEmail(event);
        });
    },

    /**
     * simulate a scroll down up to the html element self.setup.id_first_page
     */
    goDown: function() {
        let self = this;
        $('html, body').animate({
            scrollTop: $(self.setup.id_first_page).offset().top
        }, 1200);
    },

    /**
     * initialize an object Typed with options
     */
    initAutoTyped: function() {
        let self = this;
        let typed = new Typed(self.setup.id_auto_typed, {
            strings: self.setup.auto_typed_strings,
            smartBackspace: true,
            typeSpeed: 50,
            loop: true
        });
    },

    /**
     * equalize the height of all items of the formation timeline
     */
    setHeightTimelineItems: function() {
        let items = $(".timeline li > div");
        let maxHeight = 0;
        for (let i = 0; i < items.length; i++) {
            const singleHeight = items[i].offsetHeight;
            if (maxHeight < singleHeight) {
                maxHeight = singleHeight;
            }
        }
        for (let i = 0; i < items.length; i++) {
            items[i].style.height = `${maxHeight}px`;
        }
    },

    /**
     * check all input of the contact form to check if they are valid
     * @param event
     * @returns {boolean}
     */
    checkAll: function(event) {
        let self = this;
        let $currentTarget = $(event.currentTarget);

        if ($currentTarget.val().trim() === '') {
            self.reset($currentTarget);
            return false;
        }
        let res;
        switch($currentTarget.attr('id')) {
            case 'firstname':
            case 'lastname':
                res = self.validate_isName($currentTarget.val());
                if (!res) {
                    M.toast({html: 'Your name is not valid !'});
                }
                self.validateTarget(res, $currentTarget);
                break;
            case 'email':
                res = self.validate_isEmail($currentTarget.val());
                if (!res) {
                    M.toast({html: 'Your email is not valid !'});
                }
                self.validateTarget(res, $currentTarget);
                break;
            default:
                self.validateTarget(true, $currentTarget);
        }
    },

    /**
     * reset a html element
     * @param $currentTarget
     */
    reset: function($currentTarget) {
        $currentTarget.removeClass('valid')
            .removeClass('invalid')
            .val('');
    },

    /**
     * add class 'valid' or 'invalid' on html element to inform the user if his input is correct or not
     * @param $valid
     * @param $currentTarget
     */
    validateTarget: function($valid, $currentTarget) {
        if (!$valid) {
            $currentTarget.removeClass('valid').addClass('invalid');
        } else {
            $currentTarget.removeClass('invalid').addClass('valid');
        }
    },

    /**
     * check with a regexp if name is valid
     * at least 1 char and not in [ 0 to 9 ! < > , ; ? & = + ( ) @ # " ° { } _ $ % :]
     * @param s
     * @returns {boolean}
     */
    validate_isName: function(s) {
        let reg = /^[^0-9!<>,;?&=+()@#"°{}_$%:]+$/;
        return reg.test(s);
    },

    /**
     * check with a regexp if email is valid
     * atLeastOneChar@atLeastOneChar.atLeastTwoChar
     * @param s
     * @returns {boolean}
     */
    validate_isEmail: function(s) {
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(s);
    },

    /**
     * check the form then send data in AJAX to the self.setup.url_ajax php page
     * @param event
     */
    ajaxSendEmail: function (event) {
        let self = this;
        let $currentTarget = $(event.currentTarget);

        let firstname = $(self.setup.id_contact_firstname).val();
        let lastname = $(self.setup.id_contact_lastname).val();
        let email = $(self.setup.id_contact_email).val();
        let message = $(self.setup.id_contact_message).val();

        let ajax = true;

        if (!self.validate_isName(firstname)) {
            M.toast({html: 'Your firstname is not valid !'});
            ajax = false;
        }
        if (!self.validate_isName(lastname)) {
            M.toast({html: 'Your lastname is not valid !'});
            ajax = false;
        }
        if (!self.validate_isEmail(email)) {
            M.toast({html: 'Your email is not valid !'});
            ajax = false;
        }
        if (message === '') {
            M.toast({html: 'Your message is not valid !'});
            ajax = false;
        }
        if (ajax) {
            $.ajax({
                'type': 'POST',
                'url': self.setup.url_ajax,
                'data': {
                    action: 'sendMail',
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    message: message,
                },
                'success': function (data) {
                    data = self.parseJSON(data);

                    if (data === false) {
                        // Server error controller
                        M.toast({html: 'Server error controller'});
                    } else {
                        M.toast({html: data.message});
                    }
                }
            }).fail(function () {
                /**
                 * 404, 500 or others errors
                 */
                M.toast({html: 'Erreur Serveur'});
            });
        }
    },

    /**
     * Parse a JSON string
     * @param {type} json_string
     * @return {undefined|Boolean}
     */
    parseJSON: function(json_string) {
        try {
            var json_parsed = JSON.parse(json_string);
        } catch (e) {
            console.log("Unable to parse content: ");
            return false;
        }
        return json_parsed;
    },

};

/**
 * Object DIGITAL_RESUME_SCROLL_MAGIC contains functions relative to ScollMagic
 */
DIGITAL_RESUME_SCROLL_MAGIC = {
    /**
     * object setup contains all variables
     */
    setup: {
        id_slide_container: '#slideContainer',
        id_pin_container: '#pinContainer',

        controller: '',
        slides: '',
        scene: ''
    },

    /**
     * Initialize the scroll magic effect
     */
    init: function() {
        let self = this;

        self.setup.controller = new ScrollMagic.Controller();
        self.setup.slides = new TimelineMax()

            .to(self.setup.id_slide_container, 0.5, {z: -150})
            .to(self.setup.id_slide_container, 1,   {x: "-25%"})
            .to(self.setup.id_slide_container, 0.5, {z: 0})

            .to(self.setup.id_slide_container, 0.5, {z: -150, delay: 1})
            .to(self.setup.id_slide_container, 1,   {x: "-50%"})
            .to(self.setup.id_slide_container, 0.5, {z: 0})

            .to(self.setup.id_slide_container, 0.5, {z: -150, delay: 1})
            .to(self.setup.id_slide_container, 1,   {x: "-75%"})
            .to(self.setup.id_slide_container, 0.5, {z: 0});

        self.setup.scene = new ScrollMagic.Scene({
            triggerElement: self.setup.id_pin_container,
            triggerHook: "onLeave",
            duration: "400%"
        }).setPin(self.setup.id_pin_container).setTween(self.setup.slides).addTo(self.setup.controller);
    }
};

/**
 * executes when HTML-Document is loaded and DOM is ready
 * initialize the needed elements
 */
$(document).ready(function() {
    DIGITAL_RESUME_SCROLL_MAGIC.init();
    DIGITAL_RESUME.init();
});

/**
 * executes when complete page is fully loaded, including all frames, objects and images
 * fade out the pre-loader
 */
$(window).on('load', function(){
    $(".loader").fadeOut(1000);
});