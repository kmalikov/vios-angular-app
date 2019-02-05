//** FILE: groupby.js *****************************************************************************************************************************************************************************************/


var page = 0;

var groupByResultsCt = 0;

//query.append(view);
//doQuery();

function resetPaging(){
  page = 0;
  groupByResultsCt = 0;
}

function pageRight(){
  setViewOffset(getViewOffset() + SIZE_RESULT_SET);
  page++;
  //fct_query(query, VIEW_TYPE_LIST_COUNT);
  selectGroupBy(true);
}

function pageLeft(){
  setViewOffset(getViewOffset() - SIZE_RESULT_SET);
  page--;
  //fct_query(query, VIEW_TYPE_LIST_COUNT);
  selectGroupBy(true);
}

function loadTextResults(xml){
  $('#'+ID_GROUP_BY+'').empty();

  var rows = "";
  var result = $(xml).find("fct\\:result")[0];
  groupByResultsCt = $("fct\\:row", result).length;
  if(page == 0){
    $("#leftButton").attr('disabled', 'true');
    $("#leftButton").addClass('disabled');
    $('#leftButton').removeAttr('title');
  }
  else{

    $("#leftButton").removeAttr('disabled');
    $("#leftButton").removeClass('disabled');
    $('#leftButton').attr('title', 'page ' + (page));

  }
  if(groupByResultsCt < SIZE_RESULT_SET) {
    $("#rightButton").attr('disabled', 'true');
    $("#rightButton").addClass('disabled');
    $('#rightButton').removeAttr('title');
  }
  else {
    $("#rightButton").removeAttr('disabled');
    $("#rightButton").removeClass('disabled');
    $('#rightButton').attr('title', 'page ' + (page+2));

  }

  $("fct\\:row", result).each(function(i) {
    //console.log($(this).html());
    var col = $(this).find("fct\\:column");

    // shortform can be used in lieu of the label for URI values
    var value, datatype, shortform, label, lang, ct, trank, erank, g, text; // TODO: need to utilize the lang property for filtering results for the user

    $("fct\\:column", this).each(function(j) {
      // can't figure out how to access CDATA value of the element, tried many combinations of accessors, none worked
      val = $(this).html().replace("<!--[CDATA[","").replace("]]-->","");
      //console.log(val);
      switch(j){
        //case 0: value = val; shortform = $(this).attr('datatype'); datatype = $(this).attr('datatype'); lang = $(this).attr('xml\\:lang'); break;
        case 0: trank = val; break;
        case 1: erank = val; break;
        case 2: g = val; break;
        case 3: value = val; datatype = $(this).attr('datatype'); break;
        case 4: label = val; break;
        case 5: text = htmlDecode(val); break;
      }
    });


    if(value.length <= 0 && label.length <= 0 && ct<= 1){
      //rows += '<tr><td class="up" id="gbr_'+id+'"><span style="font-size:smaller;font-family:Consolas,Courier New; color: #000" id="'+id+'">';
      //rows += 'Too many results. Please filter them.';
      //rows += '</span></td></tr>';
    }
    else {
      label = processLabel(label, value, datatype);

      // POI: the label and values need to have the apostrophe (') char removed before insertion into the javascript functions below
      // but they need to be desanitized by the respective javascript methods before being used in a query (or else the query will fail due to value mismatch)
      // also, a double encoding is used by the sanitize function, so we have to desanitize the label before displaying it in the data canvas
      label = sanitizeLabel(label);
      value = sanitizeLabel(value);
      //console.log($(col[0]));
      var id = createId();
      rows += '<tr><td class="up" id="txt1_'+id+'"><span id="'+id+'">';
      rows += '<a href="#'+id+'" onmouseover="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').addClass(\'focus\')" onmouseout="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').removeClass(\'focus\')" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://www.iconsdb.com/icons/preview/black/blank-file-xxl.png" width="16" height="16" /></a>&nbsp;'+getFavicon(value)+'&nbsp;';
      label = deSanitizeLabel(label);
      rows += '<a title="'+value+'" href="#'+id+'" onclick="javascript:describe(\''+value+'\');">'+label+'</a>';
      rows += '</span></td></tr>';
      rows += '<tr><td class="txt" id="txt2_'+id+'"><span id="'+id+'">';
      rows += text;
      rows += '</span></td></tr>';
    }
  });
  //console.log(rows);
  $('#'+ID_GROUP_BY+'').append(rows);

  //$('#groupby').append(rows);
  //return total;




} // loadTextResults

function getFavicon(value){
  return '<img height="16" width="16" src="http://www.google.com/s2/favicons?domain='+getHostName(value)+'" />';
}

function toJSONString(json){
  return htmlEncode(JSON.stringify(json).replaceAll('\"','&quot;'));
}

function toJSONObject(str){
  try{
    return JSON.parse(htmlDecode(str));
  }
  catch(e){
    console.log('error with json: ' + str + ', err: ' + e);
  }
}

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function htmlEncode(value){
  // Create a in-memory div, set its inner text (which jQuery automatically encodes)
  // Then grab the encoded contents back out. The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

// TODO: regex approach might be faster, see here https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};
/*
function htmlEncode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
*/

function loadGroupByResults(xml){
  $('#'+ID_GROUP_BY+'').empty();

  var rows = "";
  var result = $(xml).find("fct\\:result")[0];
  groupByResultsCt = $("fct\\:row", result).length;
  if(page == 0){
    $("#leftButton").attr('disabled', 'true');
    $("#leftButton").addClass('disabled');
    $('#leftButton').removeAttr('title');
  }
  else{

    $("#leftButton").removeAttr('disabled');
    $("#leftButton").removeClass('disabled');
    $('#leftButton').attr('title', 'page ' + (page));

  }
  if(groupByResultsCt < SIZE_RESULT_SET) {
    $("#rightButton").attr('disabled', 'true');
    $("#rightButton").addClass('disabled');
    $('#rightButton').removeAttr('title');
  }
  else {
    $("#rightButton").removeAttr('disabled');
    $("#rightButton").removeClass('disabled');
    $('#rightButton').attr('title', 'page ' + (page+2));

  }

  $("fct\\:row", result).each(function(i) {
    //console.log($(this).html());
    var col = $(this).find("fct\\:column");

    // shortform can be used in lieu of the label for URI values
    var value, datatype, shortform, label, lang, ct; // TODO: need to utilize the lang property for filtering results for the user

    $("fct\\:column", this).each(function(j) {
      // can't figure out how to access CDATA value of the element, tried many combinations of accessors, none worked
      val = $(this).html().replace("<!--[CDATA[","").replace("]]-->","");
      //console.log(val);
      switch(j){
        case 0: value = val; shortform = $(this).attr('datatype'); datatype = $(this).attr('datatype'); lang = $(this).attr('xml\\:lang'); break;
        case 1: label = val; break;
        case 2: ct = val; break;
      }
    });

    if(!datatype) datatype = '';

    if(value.length <= 0 && label.length <= 0 && ct<= 1){
      //rows += '<tr><td class="up" id="gbr_'+id+'"><span style="font-size:smaller;font-family:Consolas,Courier New; color: #000" id="'+id+'">';
      //rows += 'Too many results. Please filter them.';
      //rows += '</span></td></tr>';
    }
    else {
      label = processLabel(label, value, datatype);

      // POI: the label and values need to have the apostrophe (') char removed before insertion into the javascript functions below
      // but they need to be desanitized by the respective javascript methods before being used in a query (or else the query will fail due to value mismatch)
      // also, a double encoding is used by the sanitize function, so we have to desanitize the label before displaying it in the data canvas
      label = sanitizeLabel(label);
      value = sanitizeLabel(value);
      //console.log($(col[0]));
      var id = createId();

      var opts = new Object();
      opts.tag = TAG_LIST;
      opts.parentId = 'gbr_'+id;
      opts.childrenId = opts.tag + opts.parentId;

      rows += '<tr><td class="up" id="'+opts.parentId+'"><span id="'+id+'">';
      var propIRI = $('#groupByMenu :selected').attr('value');
      var propLabel = $('#groupByMenu :selected').text();
      if(propIRI != GROUP_BY_NONE_VALUE && propIRI != GROUP_BY_TEXT_VALUE){
        rows += '&nbsp;<a href="#'+id+'" onclick="javascript: remove(\''+_root.find('.' + getMainFocus().attr('class') + ' > [iri=\''+propIRI+'\']').attr('class')+'\'); addPropertyFacet(\''+id+'\', \''+propIRI+'\', \''+propLabel+'\', \''+sanitizeLabel(value)+'\', \''+sanitizeLabel(label)+'\', \''+datatype+'\')"><img src="http://icon-park.com/imagefiles/folder_icon_black.png" width="16" height="16"/></a>&nbsp;';
      }
      else {
        if(datatype=='uri') rows += '<a href="#'+id+'" onmouseover="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').addClass(\'focus\')" onmouseout="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').removeClass(\'focus\')" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://www.iconsdb.com/icons/preview/black/blank-file-xxl.png" width="16" height="16" /></a>&nbsp;'+getFavicon(value)+'&nbsp;';
        else rows += '<a href="#'+id+'" onmouseover="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').addClass(\'focus\')" onmouseout="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').removeClass(\'focus\')" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" width="16" height="16" /></a>&nbsp;';
      }
      label = deSanitizeLabel(label);
      if(datatype=='uri') rows += '<a title="'+value+'" href="#'+id+'" onclick="javascript:describe(\''+value+'\');">'+label+'</a>';
      else rows += label;
      if($('#groupByMenu :selected').attr('value') != GROUP_BY_NONE_VALUE) rows += '&nbsp;&nbsp;<a title="click to drop-down" class="count" href="#'+id+'" onclick="javascript:expand(\''+value+'\', \''+datatype+'\', \''+toJSONString(opts)+'\')">'+ct+'</a>';
      rows += '</span></td></tr>';
    }
  });
  //console.log(rows);
  $('#'+ID_GROUP_BY+'').append(rows);

  //$('#groupby').append(rows);
  //return total;



} // loadGroupByResults


function expand(v, datatype, optsStr){
  var opts = toJSONObject(optsStr);
  var childrenId = opts.childrenId;
  var parentId = opts.parentId;
  v = deSanitizeLabel(v);
  if($('#'+parentId+'').attr('class') == 'up'){
    $('#'+parentId+'').removeClass('up');
    $('#'+parentId+'').addClass('down');
  }
  else{
    collapse(opts);
    return;
  }
  //console.log('user expanded: ' + childrenId);
  var children = $.createElement('table').attr('id', childrenId);
  children.attr('width', '100%');
  $('#'+parentId+'').append(children);

  var q = query.clone();
  setViewType(VIEW_TYPE_LIST, q);
  getFocus(q).find('view').attr('offset', 0);

  var groupByIRI = $('#groupByMenu :selected').attr('value');
  var prop = $.createElement('property');
  prop.attr('iri', groupByIRI);

  var val = $.createElement('value');
  val.text(v);
  val.attr('datatype', datatype);
  //val.attr('op', '=');
  //val.attr('same_as', 'yes');
  prop.append(val);
  getFocus(q).append(prop);

  $('#'+parentId+'').addClass('loading');
  //takeFocus(q, q);
  fct_query(q, VIEW_TYPE_LIST,opts);

}

function collapse(opts){
  $('#'+opts.childrenId).remove();
  $('#'+opts.parentId).removeClass('down');
  $('#'+opts.parentId).addClass('up');
}



function loadGroupByMenu(xml){

  var opts = "";
  var result = $(xml).find("fct\\:result")[0];
  var value, datatype, shortform, label, ct;
  var defaultVal;
  $("fct\\:row", result).each(function(i) {
    val = $(this).html().replace("<!--[CDATA[","").replace("]]-->","");
    if(i == 0) defaultVal = val;
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
    label = processLabel(label, value, datatype, 14);
    //console.log($(col[0]));
    opts += '<option value="'+value+'" id="'+createId()+'">'+label+'</option>';
  });

  //var previousGroupBy = $('#groupByMenu :selected').attr('value');
  $('#groupByMenu').empty();
  $('#groupByMenu').append('<option value="'+GROUP_BY_NONE_VALUE+'" id="'+createId()+'">'+GROUP_BY_NONE_LABEL+'</option>');
  $('#groupByMenu').append('<option value="'+GROUP_BY_TEXT_VALUE+'" id="'+createId()+'">'+GROUP_BY_TEXT_LABEL+'</option>');
  $('#groupByMenu').append(opts);


} // loadCategoriesResults



function selectGroupBy(isPaging){
  // update the Group By list
  var q = query.clone();
  var iri = $('#groupByMenu :selected').attr('value');
  if(iri == GROUP_BY_NONE_VALUE || iri == GROUP_BY_TEXT_VALUE){
    //takeFocus(q, q);
  }
  else{
    var prop = $.createElement('property');
    prop.attr('class', $('#groupByMenu :selected').attr('id'));
    prop.attr('iri', iri);
    //prop.attr('exclude', 'yes');
    getFocus(q).append(prop);
    takeFocus(prop, getFocus(q));
  }

  if(!isPaging){
    getFocus(q).find('view').attr('offset', 0);
    getMainFocus().find('view').attr('offset', 0);
    page = 0;
  }

  $('#groupByMenu').addClass('loading');
  if(getQueryText().length > 0 && iri == GROUP_BY_TEXT_VALUE){
    fct_query(q, VIEW_TYPE_TEXT);
  }
  else fct_query(q, VIEW_TYPE_LIST_COUNT);

  // update the Show Me list
  // POI: no need to update the show me during paging
  // need to check whether its ok not to update when a filter is
  // selected from the groupByMenu, in theory, the groupByMenu
  // should only list bound fields, but need to make sure
  // for now, we skip the showMe update when an item is
  // selected from the groupByMenu
  //if(!isPaging) selectShowMe();
}
