function makesvg( inner_text){
     var inner_text_title = "";
    var abs_percentage = parseFloat(Math.abs(parseInt(inner_text))/5).toFixed(2);
    var inner_text = parseInt(inner_text);
    var classes = ""
     console.log(abs_percentage)
    if(inner_text > 0 && inner_text <= 50){
    classes = "success-stroke ";
      inner_text_title = '优'
    } else if(inner_text > 50 && inner_text <= 100){
    classes = "yellow-stroke";
      inner_text_title = '良'
    }else if(inner_text > 101 && inner_text <= 150){
    classes = "light-stroke";
      inner_text_title = '轻度'
    }else if(inner_text > 151 && inner_text <= 200){
    classes = "middle-stroke";
      inner_text_title = '中度'
    }else if(inner_text > 201 && inner_text <= 300){
    classes = "severe-stroke";
      inner_text_title = '重度'
    } else{
    classes = "serious-stroke";
      inner_text_title = '严重'
    }

    var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
    + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
    + '<circle class="circle-chart__circle '+classes+'"'
    + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9" />'
    + '<g class="circle-chart__info">'
     + '   <text class="circle-chart__percent circle-num" x="16.9" y="11.5"  fill="#ddd">'+inner_text+'</text>';
    console.log(inner_text)
    if(inner_text){
     svg += '<text class="circle-chart__percent circle-text" fill="#ddd" x="16.9" y="19.5">'+inner_text_title+'</text>'
      // svg += '   <text class="circle-chart__percent" x="17.9" y="15.5"  fill="#ddd">'+inner_text+'</text>'
    }

    svg += ' </g></svg>';

    return svg
    }

    (function( $ ) {

    $.fn.circlechart = function() {
    this.each(function() {
    // var percentage = $(this).data("percentage");
    var inner_text = $(this).text();
    console.log(inner_text)
    $(this).html(makesvg( inner_text));
    });
    return this;
    };

    }( jQuery ));

    $('.circlechart').circlechart();
