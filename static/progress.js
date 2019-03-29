function makesvg(percentage, inner_text){
     var inner_text_title = "";
    var abs_percentage = Math.abs(percentage).toString();
    var percentage_str = percentage.toString();
    var classes = ""
    
    if(percentage < 0){
    classes = "danger-stroke circle-chart__circle--negative";
    } else if(percentage > 0 && percentage <= 50){
    classes = "warning-stroke";
      inner_text_title = '良'
    } else{
    classes = "success-stroke";
    }
    
    var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
    + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
    + '<circle class="circle-chart__circle '+classes+'"'
    + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9" />'
    + '<g class="circle-chart__info">'
     + '   <text class="circle-chart__percent" x="16.9" y="11.5"  fill="#ddd">'+inner_text+'</text>';
    console.log(inner_text)
    if(inner_text){
     svg += '<text class="circle-chart__percent" fill="#ddd" x="16.9" y="19.5">'+inner_text_title+'</text>'
      // svg += '   <text class="circle-chart__percent" x="17.9" y="15.5"  fill="#ddd">'+inner_text+'</text>'
    }
    
    svg += ' </g></svg>';
    
    return svg
    }
    
    (function( $ ) {
    
    $.fn.circlechart = function() {
    this.each(function() {
    var percentage = $(this).data("percentage");
    var inner_text = $(this).text();
    console.log(inner_text)
    $(this).html(makesvg(percentage, inner_text));
    });
    return this;
    };
    
    }( jQuery ));
    
    $('.circlechart').circlechart();
