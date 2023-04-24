/**
 * Update Customizer settings live.
 *
 * @version 1.0.0
 *
 * @since 2.0
 */

 ( function( $ ) {

    // Declare vars
	var api 				= wp.customize,
    body 				= $( 'body' ),
    siteHeader 			= $( '#site-header' ),
    llmsCol = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
    ],
    llmsTabletCol = [
        'tablet-1-col',
        'tablet-2-col',
        'tablet-3-col',
        'tablet-4-col',
        'tablet-5-col',
        'tablet-6-col'
    ],
    llmsMobileCol = [
        'mobile-1-col',
        'mobile-2-col',
        'mobile-3-col',
        'mobile-4-col',
        'mobile-5-col',
        'mobile-6-col'
    ];

    	/******** LifterLMS *********/
		// Courses columns
		api('lifterlms_columns', function( value ) {
			value.bind( function( newval ) {
				var coursesCol = $( '.llms-loop-list.llms-course-list' );
				if ( coursesCol.length ) {
					$.each( llmsCol, function( i, v ) {
						coursesCol.removeClass( 'cols-'+ v );
					});
					coursesCol.addClass( 'cols-'+ newval );
				}
			});
		});



	// Theme Options -> Layout
    //Width
		api( 'lifterlms_width', function( $swipe ) {
			$swipe.bind(
				function( newval ) {

					jQuery( 'body' ).removeClass( 'responsive-site-contained');
					jQuery( 'body' ).removeClass( 'responsive-site-full-width');
					jQuery( 'body' ).removeClass( 'responsive-site-llms-full-width');
					jQuery( 'body' ).removeClass( 'responsive-site-llms-contained');
					jQuery( 'body' ).addClass( 'responsive-site-llms-'+ newval );
					if ( newval === 'contained' && $(window).width() > 768 ) {
						jQuery( '.floatingb-container' ).css( 'width', '1140px' );
					} else {
						jQuery( '.floatingb-container' ).css( 'width', '100%' );
					}
				}
			);
		}
	);


	//syle section

	api( 'lifterlms_style', function( $swipe ) {
		$swipe.bind(
			function( newval ) {
				// remove class regex expression function
				$.fn.removeClassRegEx = function(regex) {
					var classes = $(this).attr('class');
					if (!classes || !regex) return false;
					var classArray = [];
					classes = classes.split(' ');
					for (var i = 0, len = classes.length; i < len; i++)
						if (!classes[i].match(regex)) classArray.push(classes[i]);
					$(this).attr('class', classArray.join(' '));
				};

				$('body').removeClassRegEx('responsive-site-style-');
				jQuery( 'body' ).addClass( 'responsive-site-style-'+ newval );
			}
		);
	}
);


api( 'lifterlms_box_radius', function( value ) {
	value.bind( function( newval ) {
		$('.page.front-page.responsive-site-style-content-boxed .custom-home-widget-section.home-widgets,.blog.front-page.responsive-site-style-content-boxed .custom-home-widget-section.home-widgets,.responsive-site-style-content-boxed .custom-home-about-section,.responsive-site-style-content-boxed .custom-home-feature-section,.responsive-site-style-content-boxed .custom-home-team-section,.responsive-site-style-content-boxed .custom-home-testimonial-section,.responsive-site-style-content-boxed .custom-home-contact-section,.responsive-site-style-content-boxed .custom-home-widget-section,.responsive-site-style-content-boxed .custom-home-featured-area,.responsive-site-style-content-boxed .site-content-header,.responsive-site-style-content-boxed .content-area-wrapper,.responsive-site-style-content-boxed .site-content .hentry,.responsive-site-style-content-boxed .navigation,.responsive-site-style-content-boxed .comments-area,.responsive-site-style-content-boxed .comment-respond,.responsive-site-style-boxed .custom-home-about-section,.responsive-site-style-boxed .custom-home-feature-section,.responsive-site-style-boxed .custom-home-team-section,.responsive-site-style-boxed .custom-home-testimonial-section,.responsive-site-style-boxed .custom-home-contact-section,.responsive-site-style-boxed .custom-home-widget-section,.responsive-site-style-boxed .custom-home-featured-area,.responsive-site-style-boxed .site-content-header,.responsive-site-style-boxed .site-content .hentry,.responsive-site-style-boxed .navigation,.responsive-site-style-boxed .comments-area,.responsive-site-style-boxed .comment-respond,.responsive-site-style-boxed .comment-respond,.responsive-site-style-boxed aside#secondary .widget-wrapper,.responsive-site-style-boxed .site-content article.product').css('border-radius', newval+'px' );
	} );
} );


function responsive_lifter_dynamic_box_padding( ) {
	var mobile_menu_breakpoint = api( 'responsive_mobile_menu_breakpoint' ).get();
	if( 0 == api( 'responsive_disable_mobile_menu').get()) {
		mobile_menu_breakpoint = 0;
	}

	var style = '<style id="responsive-box-padding">';

	var selector = '.responsive-site-style-content-boxed .hentry,.responsive-site-style-content-boxed .navigation,.responsive-site-style-content-boxed .site-content-header,.responsive-site-style-content-boxed .comments-area,.responsive-site-style-content-boxed .comment-respond,.responsive-site-style-boxed .hentry,.responsive-site-style-boxed .site-content-header,.responsive-site-style-boxed .navigation,.responsive-site-style-boxed .comments-area,.responsive-site-style-boxed .comment-respond,.page.front-page.responsive-site-style-flat .widget-wrapper,.blog.front-page.responsive-site-style-flat .widget-wrapper,.responsive-site-style-boxed .widget-wrapper,.responsive-site-style-boxed .site-content article.product'
	+',.woocommerce.responsive-site-style-content-boxed .related-product-wrapper,.woocommerce-page.responsive-site-style-content-boxed .related-product-wrapper,.woocommerce-page.responsive-site-style-content-boxed .products-wrapper,.woocommerce.responsive-site-style-content-boxed .products-wrapper,.woocommerce-page:not(.responsive-site-style-flat) .woocommerce-pagination,.woocommerce-page.responsive-site-style-boxed ul.products li.product,.woocommerce.responsive-site-style-boxed ul.products li.product,.woocommerce-page.single-product:not(.responsive-site-style-flat) div.product,.woocommerce.single-product:not(.responsive-site-style-flat) div.product';
	var extraSelector = ',.page-template-gutenberg-fullwidth.responsive-site-style-content-boxed .hentry .post-entry > div:not(.wp-block-cover):not(.wp-block-coblocks-map),.page-template-gutenberg-fullwidth.responsive-site-style-boxed .hentry .post-entry > div:not(.wp-block-cover):not(.wp-block-coblocks-map)';
	var topBlogSelector = '.search.responsive-site-style-boxed article.product .post-entry > .thumbnail:first-child,.search.responsive-site-style-boxed .hentry .post-entry > .thumbnail:first-child,.search.responsive-site-style-content-boxed .hentry .post-entry > .thumbnail:first-child,.archive.responsive-site-style-boxed .hentry .post-entry > .thumbnail:first-child,.archive.responsive-site-style-content-boxed .hentry .post-entry > .thumbnail:first-child,.blog.responsive-site-style-boxed .hentry .post-entry > .thumbnail:first-child,.blog.responsive-site-style-content-boxed .hentry .post-entry > .thumbnail:first-child';
	var topSingleBlogSelector = '.single.responsive-site-style-boxed .hentry .post-entry > .thumbnail:first-child,.single.responsive-site-style-content-boxed .hentry .post-entry > .thumbnail:first-child';
	var topPageSelector = '.page.responsive-site-style-boxed .hentry .post-entry > .thumbnail:first-child,.page.responsive-site-style-content-boxed .hentry .post-entry > .thumbnail:first-child';
	var leftRightBlogSelector = '.search.responsive-site-style-boxed .site-content article.product .post-entry .thumbnail,.search.responsive-site-style-content-boxed .hentry .thumbnail,.search.responsive-site-style-boxed .hentry .thumbnail,.archive.responsive-site-style-content-boxed .hentry .thumbnail,.archive.responsive-site-style-boxed .hentry .thumbnail,.blog.responsive-site-style-content-boxed .hentry .thumbnail,.blog.responsive-site-style-boxed .hentry .thumbnail';
	var leftRightSingleBlogSelector = '.single.responsive-site-style-content-boxed .hentry .thumbnail,.single.responsive-site-style-boxed .hentry .thumbnail';
	var leftRightPageSelector = '.page.responsive-site-style-content-boxed .hentry .thumbnail,.page.responsive-site-style-boxed .hentry .thumbnail';


	var desktopTopMargin = 'margin-top: -'+ api('lifterlms_top_padding').get()+'px;';
	var tabletTopMargin = 'margin-top: -'+ api('responsive_box_tablet_top_padding').get()+'px;';
	var mobileTopMargin = 'margin-top: -'+ api('responsive_box_mobile_top_padding').get()+'px;';
	var desktopLeftRightMargin = 'margin-left: -'+ api('lifterlms_right_padding').get()+'px; margin-right: -'+ api('lifterlms_right_padding').get() +'px';
	var tabletLeftRightMargin = 'margin-left: -'+ api('responsive_box_tablet_left_padding').get()+'px; margin-right: -'+ api('responsive_box_tablet_right_padding').get() +'px';
	var mobileLeftRightMargin = 'margin-left: -'+ api('responsive_box_mobile_left_padding').get()+'px; margin-right: -'+ api('responsive_box_mobile_right_padding').get() +'px';
	if('stretched' === api( 'responsive_blog_entry_featured_image_style' ).get()) {
		style += topBlogSelector + '{ ' + desktopTopMargin + ' }'
			+ leftRightBlogSelector + '{ ' + desktopLeftRightMargin + ' }'
			+ '@media (max-width: ' + mobile_menu_breakpoint +'px) {'
			+ topBlogSelector + '	{ ' + tabletTopMargin + ' }' +
			+ leftRightBlogSelector + '{ ' + tabletLeftRightMargin + ' }' +
			' }'+
			'@media (max-width: 544px) {'
			+ topBlogSelector + '	{ ' + mobileTopMargin + ' }' +
			+ leftRightBlogSelector + '{ ' + mobileLeftRightMargin +' }' +
			' }';
	}

	if('stretched' === api( 'responsive_single_blog_featured_image_style' ).get()) {
		style += topSingleBlogSelector + '{ ' + desktopTopMargin + ' }'
			+ leftRightSingleBlogSelector + '{ ' + desktopLeftRightMargin + ' }'
			+ '@media (max-width: ' + mobile_menu_breakpoint +'px) {'
			+ topSingleBlogSelector + '	{ ' + tabletTopMargin + ' }' +
			+ leftRightSingleBlogSelector + '{ ' + tabletLeftRightMargin + ' }' +
			' }'+
			'@media (max-width: 544px) {'
			+ topSingleBlogSelector + '	{ ' + mobileTopMargin + ' }' +
			+ leftRightSingleBlogSelector + '{ ' + mobileLeftRightMargin +' }' +
			' }';
	}

	if('stretched' === api( 'responsive_page_featured_image_style' ).get()) {
		style += topPageSelector + '{ ' + desktopTopMargin + ' }'
			+ leftRightPageSelector + '{ ' + desktopLeftRightMargin + ' }'
			+ '@media (max-width: ' + mobile_menu_breakpoint +'px) {'
			+ topPageSelector + '	{ ' + tabletTopMargin + ' }' +
			+ leftRightPageSelector + '{ ' + tabletLeftRightMargin + ' }' +
			' }'+
			'@media (max-width: 544px) {'
			+ topPageSelector + '	{ ' + mobileTopMargin + ' }' +
			+ leftRightPageSelector + '{ ' + mobileLeftRightMargin +' }' +
			' }';
	}


	jQuery( 'style#responsive-box-padding' ).remove();
	var desktopPadding = 'padding-top:'+ api('lifterlms_top_padding').get()+'px; '+'padding-bottom:'+ api('lifterlms_right_padding').get()+'px; '+'padding-left:'+ api('lifterlms_right_padding').get()+'px; '+'padding-right:'+ api('lifterlms_right_padding').get()+'px;';
	var tabletPadding = 'padding-top:'+ api('responsive_box_tablet_top_padding').get()+'px; '+'padding-bottom:'+ api('responsive_box_tablet_bottom_padding').get()+'px; '+'padding-left:'+ api('responsive_box_tablet_left_padding').get()+'px; '+'padding-right:'+ api('responsive_box_tablet_right_padding').get()+'px;';
	var mobilePadding = 'padding-top:'+ api('responsive_box_mobile_top_padding').get()+'px; '+'padding-bottom:'+ api('responsive_box_mobile_bottom_padding').get()+'px; '+'padding-left:'+ api('responsive_box_mobile_left_padding').get()+'px; '+'padding-right:'+ api('responsive_box_mobile_right_padding').get()+'px;';
	style += selector + '	{ ' + desktopPadding +' }'
		+ '@media (max-width: ' + mobile_menu_breakpoint +'px) {' + selector+ extraSelector + '	{ ' + tabletPadding + ' } }'
		+ '@media (max-width: 544px) {' + selector + extraSelector + '	{ ' + mobilePadding + ' } }'
		+ '</style>';
	jQuery( 'head' ).append(
		style
	);

}

   //Theme Options Layout
    //Box Padding
    api( 'lifterlms_top_padding', function( value ) {
        value.bind( function( newval ) {
            responsive_lifter_dynamic_box_padding( );
        } );
    } );
    api( 'lifterlms_left_padding', function( value ) {
        value.bind( function( newval ) {
            responsive_lifter_dynamic_box_padding( );
        } );
    } );
    api( 'lifterlms_bottom_padding', function( value ) {
        value.bind( function( newval ) {
            responsive_lifter_dynamic_box_padding( );
        } );
    } );
    api( 'lifterlms_right_padding', function( value ) {
        value.bind( function( newval ) {
            responsive_lifter_dynamic_box_padding( );
        } );
    } );





















} )( jQuery );
