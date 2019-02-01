
//** FILE: record.js **/


var twin = "vios.window.1";

$(document).ready(function () {
  $('#describe').on('load', function () {
    $('#describePanel').removeClass('loadingDescribe');
  });
});

function describe(src){
  src = deSanitizeLabel(src);
  $('#describe').attr('src', src);
  //$('#recordLabel').val(label);

  $('#describePanel').addClass('loadingDescribe');
  window.open(src, twin, 'width="'+window.outerWidth+'" height="'+window.outerHeight+'"');
}

function loadInstances(xml, opts){
  var rows = "";
  var result = $(xml).find("fct\\:result")[0];
  var value, datatype, shortform, label, ct;
  $("fct\\:row", result).each(function(i) {
    //console.log($(this).html());
    var col = $(this).find("fct\\:column");
    $("fct\\:column", this).each(function(j) {
      // can't figure out how to access CDATA value of the element, tried many combinations of accessors, none worked
      // seems like jquery is commenting out the CDATA
      val = $(this).html().replace("<!--[CDATA[","").replace("]]-->","");
      //console.log(val);
      switch(j){
        case 0: value = val; shortform = $(this).attr('datatype'); datatype = $(this).attr('datatype'); break;
        case 1: label = val; break;
        case 2: ct = val; break;
      }
    });
    label = processLabel(label, value, datatype);
    var id = createId();
    //console.log($(col[0]));
    rows += '<tr><td class="instance" id="'+id+'"><span id="'+id+'"><a href="#'+id+'" onmouseover="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').addClass(\'focus\')" onmouseout="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').removeClass(\'focus\')" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img style="margin-left:1em" src="https://www.iconsdb.com/icons/preview/black/blank-file-xxl.png" width="16" height="16" /></a>&nbsp;'+getFavicon(value)+'&nbsp;<a title="'+value+'" href="#'+id+'" onclick="javascript:describe(\''+value+'\');">'+label+'</a></span></td></tr>';
  });



  // todo: load the first record


  //console.log(rows);
  $('#'+opts.childrenId+'').append(rows);

  //$('#groupby').append(rows);
  //return total;


}
