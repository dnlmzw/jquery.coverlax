$(document).ready(function(){
	$('img').coverlax();
});

var options =
{
	overflow : false,
	toggleOverflow : function ()
	{
		if(this.overflow)
		{
			$('.wrapper').css('overflow', 'visible').find('.border').show();
			this.overflow = false;
		}
		else
		{
			$('.wrapper').css('overflow', 'hidden').find('.border').hide();
			this.overflow = true;
		}
	}
}