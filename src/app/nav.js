//** FILE: nav.js **/


// POI: this function is responsible for building the breadcrumbs and facetCollector
function buildNavPath(){
  $('#breadcrumbPanel').removeClass('hide');

  var breadcrumbs = $('#breadcrumbs');
  var facetCollector = $('#facetCollector');
  breadcrumbs.empty();
  facetCollector.empty();



  $(_root.find('.'+getMainFocus().attr('class') + ' > property')).each(function(i) {
    /*var children = $(this).has('property');
    var tar = (children) ? breadcrumbs : facetCollector ;*/
    var label = $(this).attr('label');
    var len = $(this).find('property').length;
    len += $(this).find('property-of').length;
    len += $(this).find('class').length;
    if(len > 0) label += ' [' + len + ']';
    //len += ', including';
    facetCollector.append( buildNavigationNode(this,  label, true) );
  });

  $(_root.find('.'+getMainFocus().attr('class') + ' > property-of')).each(function(i) {
    /*var children = $(this).has('property');
    var tar = (children) ? breadcrumbs : facetCollector ;*/
    var label = $(this).attr('label');
    var len = $(this).find('property').length;
    len += $(this).find('property-of').length;
    len += $(this).find('class').length;
    if(len > 0) label += ' [' + len + ']';
    //len += ', including';
    facetCollector.append( buildNavigationNode(this,  label, true) );
  });

  // when node.attr('class'), there are no more parents
  for(node = $(getMainFocus()); $(node).attr('class') && node.attr('class') != ID_QUERY; node = $(node).parent()){
    breadcrumbs.prepend( buildNavigationNode(node, $(node).attr('label') ) );
  }

  //if(getQueryText() || _root.find('class').length > 0 || _root.find('property').length > 0){

  var label = "keywords";
  // showing the count for the root is confusing, use can see the children of the root and their counts, that should suffice
  //var len = _root.find('query property').length;
  //if(len > 0) label += ' [' + len + ']';

  breadcrumbs.prepend( buildNavigationNode(_root.find('query'), label));

  //}

}

function buildNavigationNode(ele, desc, isFacet){

  var id = $(ele).attr('class');
  var label = (id == ID_QUERY) ? $(ele).find('text').text() : $(ele).text();
  var v = _root.find('.'+id + ' > value'); // use only the <value> that is directly under this node, not other descendant <value>'s
  var c = _root.find('.'+id + ' > class'); // use only the <value> that is directly under this node, not other descendant <value>'s
  var val, cval;
  if(v.length > 0) val = v.attr('label');
  if(c.length > 0) cval = c.attr('label');
  //val = val.trim();

  var isPropOf = ($(ele).prop('nodeName')) ? $(ele).prop('nodeName').toLowerCase() === 'property-of' : false;
  //console.log('nodeName: ' + $(ele).prop('nodeName'));
  //if(isPropOf) console.log('is property-of: ' + label);

  var action = "removeValue";
  if(!val) {
    if(!cval) action = "remove";
    if(id == ID_QUERY) val = label;
    else{
      if(cval){
        val = cval;
      }
      else {
        val = VALUE_ANON_NODE;
      }
    }
  }

  // TODO: decided whether the focus var will ever be used, and if not, remove it; the logic changed so that this is now triggered on mouseover of records and categories
  var focus = "";// hasMainFocus(id) ? 'class="focus"' : '';
  //if(focus) console.log("focus set: " + focus);
  var img = (isFacet) ? '<img src="http://icon-park.com/imagefiles/folder_icon_black.png" width="24" height="24"/>&nbsp;' : '/&nbsp;';
  if(isFacet) $('#facetCollectorPanel').removeClass('hide');
  // remove the bracket numbers for child count, this is unsafe, since a bracket may be a legitimate part of the label
  // instead, need to pass the child count to this method


  //if(!desc || desc.length == 0) desc = 'anything'; // POI: !desc if this is the <query> and there are no keywords, if no keywords, set keywords to 'anything'

  if(isPropOf) {
    var ttd = desc;
    if(ttd) {
      if(ttd.indexOf('[') > 0) ttd = ttd.substring(0, ttd.lastIndexOf('['));
      ttd = ttd.trim();
    }
    var tooltip = 'and what uses it as a ' + ttd;
    if(ttd.endsWith(' to') || ttd.endsWith('To')){
      tooltip = 'and what ' + ttd + ' it';
    }
    else if(ttd.endsWith(' of') || ttd.endsWith('Of')){
      var isa = 'is a ';
      if( (ttd.startsWith('is') || ttd.startsWith('Is')) && ttd.length > 2 && (ttd.charAt(2).toUpperCase() == ttd.charAt(2) || ttd.charAt(2) == ' ') ) isa = '';
      tooltip = 'and what ' + isa + ttd + ' it';
    }
    else if(ttd.startsWith('has')){
      tooltip = 'and what ' + ttd + ' represented by it';
    }
    else if(ttd.endsWith('by') || ttd.endsWith('By')){
      tooltip = 'and what is ' + ttd + ' it';
    }
    else if(ttd.endsWith('ing')){
      tooltip = 'and what is ' + ttd + ' it';
    }
    desc += '*';
  }
  else {
    var ttd = desc;
    if(ttd) {
      if(ttd.indexOf('[') > 0) ttd = ttd.substring(0, ttd.lastIndexOf('['));
      ttd = ttd.trim();
    }
    var tooltip = 'and what is its ' + ttd;
    if(ttd.endsWith(' to') || ttd.endsWith('To')){
      tooltip = 'and what it ' + ttd;
    }
    else if(ttd.endsWith(' of') || ttd.endsWith('Of')){
      var isa = 'is a ';
      if( (ttd.startsWith('is') || ttd.startsWith('Is')) && ttd.length > 2 && (ttd.charAt(2).toUpperCase() == ttd.charAt(2) || ttd.charAt(2) == ' ') ) isa = '';
      tooltip = 'and it ' + isa + ttd + ' what';
    }
    else if(ttd.startsWith('has') || ttd.startsWith('Has')){
      tooltip = 'and it ' + ttd + ' among these';
    }
    else if(ttd.endsWith('by') || ttd.endsWith('By')){
      tooltip = 'and what is it ' + ttd;
    }
    else if(ttd.endsWith('ing')){
      tooltip = 'and what is it ' + ttd;
    }
  }
  if(val != VALUE_ANON_NODE && cval != val) {
    // TODO: this label is due to a bug in Virtuoso, the filters aren't being applied, causing the query to conform to what this label says
    // bug submitted: https://github.com/openlink/virtuoso-opensource/issues/823
    tooltip += ', where one of them is ' + val;
    // tooltip += ' where the answer is ' + val; // the correct tooltip
  }
  if(cval){
    var whichOrAnd = ', where';
    if(val != VALUE_ANON_NODE && cval != val) whichOrAnd = ', and';
    tooltip += whichOrAnd + ' each of them is';

    var cvals = _root.find('.'+id + ' > class');
    for(i = 0; i < cvals.length; i++){
      if(i > 0 && cvals.length == 1) break;
      var aoran = aOrAn($( cvals[i] ).attr('label').substring(0, 1));
      tooltip += ' ' + aoran + ' ' + $( cvals[i] ).attr('label');
      if(i+1 < cvals.length) {
        tooltip += ',';
      }
      if(i+2 == cvals.length) {
        tooltip += ' and';
      }
    }

  }
  if(id == ID_QUERY) {
    if(cval){
//            desc += '<br/>+ ' + cval;
      desc = cval;
//            tooltip += ' a '; // add article for the ensuing category
    }

    // TODO: need to remove the redundancy here
    if(v.attr('datatype') == 'uri'){
      tooltip = 'the record for ' + val;
      desc = 'record';
      if(getQueryGraphLabel() && getQueryGraphLabel().length > 0) {
        desc += '@'+ getQueryGraphLabel();
      }
      else if(getQueryGraph() && getQueryGraph().length > 0) {
        desc += '@'+getQueryGraph();
      }
      if(getQueryText() && getQueryText().length){
        tooltip = 'does ' + tooltip + ' contain keywords: \'' + getQueryText() + '\'';
      }
    }
    else if(val){
      tooltip = 'what records contain keywords: ' + val;
      if(getQueryGraphLabel() && getQueryGraphLabel().length > 0) {
        tooltip += ', in library: ' + getQueryGraphLabel();
        desc += '@'+ getQueryGraphLabel();
      }
      else if(getQueryGraph() && getQueryGraph().length > 0) {
        tooltip += ', in library: ' + getQueryGraph();
        desc += '@'+getQueryGraph();
      }
    }
    else {
      tooltip = 'any record';
      if(!cval) {
        if(getQueryGraphLabel() && getQueryGraphLabel().length > 0) {
          tooltip += ', in library: ' + getQueryGraphLabel();
          desc += '@'+ getQueryGraphLabel();
        }
        else if(getQueryGraph() && getQueryGraph().length > 0) {
          tooltip += ', in library: ' + getQueryGraph();
          desc += '@'+getQueryGraph();
        }
        else desc = LABEL_ROOT;
      }
      else {
        if(getQueryGraphLabel() && getQueryGraphLabel().length > 0) {
          tooltip += ', in library: ' + getQueryGraphLabel();
          desc += '@'+ getQueryGraphLabel();
        }
        else if(getQueryGraph() && getQueryGraph().length > 0) {
          tooltip += ', in library: ' + getQueryGraph();
          desc += '@'+getQueryGraph();
        }
      }
    }
    if(cval){

      tooltip += ', and each of them is';

      var cvals = _root.find('.'+id + ' > class');
      for(i = 0; i < cvals.length; i++){
        if(i > 0 && cvals.length == 1) break;
        var aoran = aOrAn($( cvals[i] ).attr('label').substring(0, 1));
        tooltip += ' ' + aoran + ' ' + $( cvals[i] ).attr('label');
        if(i+1 < cvals.length) {
          tooltip += ',';
        }
        if(i+2 == cvals.length) {
          tooltip += ' and';
        }
      }
    }
  }
  if( (v.attr('datatype') != 'uri' && (!v.attr('iri') || v.attr('iri').length <= 0)) && ( !cval || id == ID_QUERY)){
    if(val.length > 0 && val != VALUE_ANON_NODE) val = '\'' + val + '\'';
  }

  //var slash = (!isFacet) ? '/' : '';
  var ret =
    '<td title="'+tooltip+'" id="nav'+id+'" '+focus+'><table><tbody>'+
    '<tr><td onclick="javascript:'+action+'(\''+id+'\')" class="via '+((!isFacet)?' breadcrumb':'')+'">'+desc+'</td></tr>'+
    '<tr><td onclick="javascript:takeMainFocus(\''+id+'\')" class="boundValue">' + img + val + '</td></tr>'+
    '</tbody></table></td>';
  //console.log("bc added: " + ret);
  return ret;
}

function aOrAn(word){
  word = word.toLowerCase();
  if(word.startsWith('a')||word.startsWith('e')||word.startsWith('i')||word.startsWith('o')||word.startsWith('u')) return 'an';
  return 'a';
}
