/*
 * Coverlax v0.10
 * jQuery plugin by
 * Daniel Mierzwinski
 * https://github.com/dnlmzw
 *
 * Built on jQuery Boilerplate
 */

;(function( $, window, document, undefined ) {

    var pluginName = "coverlax"
    var defaults = {
        fixed: false,
		vertical: true, // Not implemented
        reverse: false // Not implemented
	};

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            // Shortcut jQuery object, reference to plugin
            var ref = this;
            var el = $(this.element);

            // Setup
            this.setup();

            // Update on resize
            $(window).bind('scroll', function() { ref.position(); });
        },

        setup : function() {
            // Shortcut jQuery object
            var el = $(this.element);
            // Set img's display type
            el.css('display', 'inline-block');
            // Update position
            this.position();
        },

        position: function(pct) {
            // Shortcut jQuery object
            var el = $(this.element);
            // Define element boundaries
            var boundary = el.parent();
            var boundaryPoints = {top: boundary.offset().top, bottom: boundary.offset().top + boundary.height()};
            // Position of window scroll
            var scrollPos = $(window).scrollTop() - boundaryPoints.top + $(window).height();
            // The maximum spectrum in which the object is visible
            var scrollSpectrum = $(window).height() + boundary.height();
            // This part makes sure that the picture has a full animation eventhough
            // the possible spectrum of scroll might be missing since the picture is within the window
            // at initilization or doesn't travel outside when scrolling to the bottom of the page
            if(boundaryPoints.top < $(window).height())
            { // Triggers if top of the boundary will never hit the bottom the window
                scrollPos = $(window).scrollTop();
                scrollSpectrum = boundaryPoints.bottom;
            }
            else if (boundaryPoints.bottom > $(document).height() - $(window).height())
            { // Triggers if bottom of the boundary will never hit the top the window
                scrollSpectrum = $(document).height() - boundaryPoints.top;
            }
            // Element position in percentage
            pct = Math.min(Math.max(scrollPos / scrollSpectrum, 0), 1)
            // The amount to use as negative margin
            var excess = el.height() - boundary.height();
            // Set negative margin
            el.css({marginTop: Math.round(0 - pct * excess)});
        }
    };

    $.fn[pluginName] = function( options ) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );