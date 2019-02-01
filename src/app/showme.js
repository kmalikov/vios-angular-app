//** FILE: showme.js **/
var showMePage = 0;

var showMeResultsCt = 0;

//query.append(view);
//doQuery();

function showMeResetPaging(){
  showMePage = 0;
  showMeResultsCt = 0;
}

function showMePageRight(){
  setViewOffset(getViewOffset() + SIZE_RESULT_SET);
  showMePage++;
  //fct_query(query, VIEW_TYPE_LIST_COUNT);
  selectShowMe(true);
}

function showMePageLeft(){
  setViewOffset(getViewOffset() - SIZE_RESULT_SET);
  showMePage--;
  //fct_query(query, VIEW_TYPE_LIST_COUNT);
  selectShowMe(true);
}

function loadCategoriesResults(xml){
  $('#'+ID_SHOW_ME+'').empty();

  var rows = "";
  var result = $(xml).find("fct\\:result")[0];
  showMeResultsCt = $("fct\\:row", result).length;
  if(showMePage == 0){
    $("#showMeLeftButton").attr('disabled', 'true');
    $("#showMeLeftButton").addClass('disabled');
    $('#showMeLeftButton').removeAttr('title');
  }
  else{

    $("#showMeLeftButton").removeAttr('disabled');
    $("#showMeLeftButton").removeClass('disabled');
    $('#showMeLeftButton').attr('title', 'page ' + (showMePage));

  }
  if(showMeResultsCt < SIZE_RESULT_SET) {
    $("#showMeRightButton").attr('disabled', 'true');
    $("#showMeRightButton").addClass('disabled');
    $('#showMeRightButton').removeAttr('title');
  }
  else {
    $("#showMeRightButton").removeAttr('disabled');
    $("#showMeRightButton").removeClass('disabled');
    $('#showMeRightButton').attr('title', 'page ' + (showMePage+2));

  }
  // POI: custom logic for demo of MyVios Record category
  /*if(showMePage==0 && $('#nav0 > table > tbody > tr > td.via').text() == VALUE_ROOT) rows += '<tr><td><div class="up" id="'+ID_MY_RECORDS+'"><a href="#'+id+'" onmouseover="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').addClass(\'focus\')" onmouseout="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').removeClass(\'focus\')"><img src="http://icon-park.com/imagefiles/folder_icon_purple.png" width="16" height="16"/></a>&nbsp;<a title="'+VALUE_MANAGED_RECORD+'" href="#'+id+'">'+VALUE_MANAGED_RECORD+'</a> <span class="disabled">'+(Math.floor(Math.random() * 10000) + 1)+'<span></div></td></tr>';*/
  $("fct\\:row", result).each(function(i) {
    //console.log($(this).html());
    var col = $(this).find("fct\\:column");
    var value, datatype, shortform, label, ct;
    $("fct\\:column", this).each(function(j) {
      // can't figure out how to access CDATA value of the element, tried many combinations of accessors, none worked
      // seems like jquery is commenting out the CDATA
      val = $(this).html().replace("<!--[CDATA[","").replace("]]-->","");
      //console.log(val);
      switch(j){
        case 0: uri = val; break;
        case 1: label = val; break;
        case 2: ct = val; break;
      }
    });
    label = processLabel(label, uri, datatype);
    var id = createId();
    //console.log($(col[0]));
    var opts = new Object();
    opts.tag = TAG_CLASS;
    opts.parentId = 'smr_'+id;
    opts.childrenId = opts.tag + opts.parentId;
    opts.contextId = id;
    rows += '<tr><td><div class="up" id="'+opts.parentId+'"><a href="#'+id+'" onmouseover="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').addClass(\'focus\')" onmouseout="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').removeClass(\'focus\')" onclick="javascript: addClassFacet(\''+id+'\', \''+uri+'\', \''+sanitizeLabel(label)+'\')"><img src="http://icon-park.com/imagefiles/folder_icon_navy_blue.png" width="16" height="16"/></a>&nbsp;<a title="'+uri+'" href="#'+id+'" onclick="javascript:describe(\''+uri+'\');">'+label+'</a>&nbsp;&nbsp;<a title="view instances" class="count" href="#'+id+'" onclick="javascript:expandShowMe(\''+uri+'\', \''+datatype+'\', \''+toJSONString(opts)+'\')">'+ct+'</a></div></td></tr>';
  });
  //console.log(rows);
  $('#'+ID_SHOW_ME+'').append(rows);

  //$('#groupby').append(rows);
  //return total;
} // loadCategoriesResults


function loadPropertiesResults(xml){
  $('#'+ID_SHOW_ME+'').empty();

  var rows = "";
  var result = $(xml).find("fct\\:result")[0];
  showMeResultsCt = $("fct\\:row", result).length;
  if(showMePage == 0){
    $("#showMeLeftButton").attr('disabled', 'true');
    $("#showMeLeftButton").addClass('disabled');
    $('#showMeLeftButton').removeAttr('title');
  }
  else{

    $("#showMeLeftButton").removeAttr('disabled');
    $("#showMeLeftButton").removeClass('disabled');
    $('#showMeLeftButton').attr('title', 'page ' + (showMePage));

  }
  if(showMeResultsCt < SIZE_RESULT_SET) {
    $("#showMeRightButton").attr('disabled', 'true');
    $("#showMeRightButton").addClass('disabled');
    $('#showMeRightButton').removeAttr('title');
  }
  else {
    $("#showMeRightButton").removeAttr('disabled');
    $("#showMeRightButton").removeClass('disabled');
    $('#showMeRightButton').attr('title', 'page ' + (showMePage+2));

  }

  // POI: demo code
  /*if(showMePage==0 && $('#nav0 > table > tbody > tr > td.via').text() == VALUE_ROOT) rows += '<tr><td><div class="up" id="'+ID_MY_RECORDS+'"><a href="#'+id+'" onmouseover="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').addClass(\'focus\')" onmouseout="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').removeClass(\'focus\')"><img src="http://icon-park.com/imagefiles/folder_icon_purple.png" width="16" height="16"/></a>&nbsp;<a title="'+VALUE_RECORD_MANAGER+'" href="#'+id+'">'+VALUE_RECORD_MANAGER+'</a> <span class="disabled">'+(Math.floor(Math.random() * 10000) + 1)+'<span></div></td></tr>';*/

  $("fct\\:row", result).each(function(i) {
    //console.log($(this).html());
    var col = $(this).find("fct\\:column");

    // shortform can be used in lieu of the label for URI values
    var propIRI, datatype, shortform, propLabel, ct;
    $("fct\\:column", this).each(function(j) {
      // can't figure out how to access CDATA value of the element, tried many combinations of accessors, none worked
      val = $(this).html().replace("<!--[CDATA[","").replace("]]-->","");
      //console.log(val);
      switch(j){
        case 0: propIRI = val; shortform = $(this).attr('datatype'); datatype = $(this).attr('datatype'); break;
        case 1: propLabel = val; break;
        case 2: ct = val; break;
      }
    });
    //label = processLabel(label, uri, datatype);
    //var id = createId();
    //console.log($(col[0]));
    propLabel = processLabel(propLabel, propIRI, datatype);
    //console.log($(col[0]));
    var id = createId();
    var opts = new Object();
    opts.tag = TAG_PROPERTY;
    opts.parentId = 'smr_'+id;
    opts.childrenId = opts.tag + opts.parentId;
    opts.contextId = id;
    opts.propIRI = propIRI;
    opts.propLabel = propLabel;
    rows += '<tr><td class="up" id="'+opts.parentId+'"><span id="'+id+'">';
    //var propIRI = $('#groupByMenu :selected').attr('value');
    //var propLabel = $('#groupByMenu :selected').text();
    if(propIRI != GROUP_BY_NONE_VALUE){
      rows += '&nbsp;<a href="#'+id+'" onclick="javascript: addPropertyFacet(\''+id+'\', \''+propIRI+'\', \''+propLabel+'\')"><img src="http://icon-park.com/imagefiles/folder_icon_black.png" width="16" height="16"/></a>&nbsp;';
    }
    /*else {
      if(datatype=='uri') rows += '<a href="#'+id+'" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://www.iconsdb.com/icons/preview/black/blank-file-xxl.png" width="16" height="16" /></a>&nbsp;';
      else rows += '<a href="#'+id+'" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" width="16" height="16" /></a>&nbsp;';
    }*/
    // a property is always a uri datatype
    if(datatype=='uri') rows += '<a title="'+propIRI+'" href="#'+id+'" onclick="javascript:describe(\''+propIRI+'\');">'+propLabel+'</a>';
    //else
    //rows += propLabel;

    rows += '&nbsp;&nbsp;<a title="view values" class="count" href="#'+id+'" onclick="javascript:expandShowMe(\''+propIRI+'\', \''+datatype+'\', \''+toJSONString(opts)+'\')">'+ct+'</a>';
    rows += '</span></td></tr>';
  });
  //console.log(rows);
  $('#'+ID_SHOW_ME+'').append(rows);

  //$('#groupby').append(rows);
  //return total;
} // loadPropertiesResults

function loadPropertiesInResults(xml){
  $('#'+ID_SHOW_ME+'').empty();

  var rows = "";
  var result = $(xml).find("fct\\:result")[0];
  showMeResultsCt = $("fct\\:row", result).length;
  if(showMePage == 0){
    $("#showMeLeftButton").attr('disabled', 'true');
    $("#showMeLeftButton").addClass('disabled');
    $('#showMeLeftButton').removeAttr('title');
  }
  else{

    $("#showMeLeftButton").removeAttr('disabled');
    $("#showMeLeftButton").removeClass('disabled');
    $('#showMeLeftButton').attr('title', 'page ' + (showMePage));

  }
  if(showMeResultsCt < SIZE_RESULT_SET) {
    $("#showMeRightButton").attr('disabled', 'true');
    $("#showMeRightButton").addClass('disabled');
    $('#showMeRightButton').removeAttr('title');
  }
  else {
    $("#showMeRightButton").removeAttr('disabled');
    $("#showMeRightButton").removeClass('disabled');
    $('#showMeRightButton').attr('title', 'page ' + (showMePage+2));

  }

  $("fct\\:row", result).each(function(i) {
    //console.log($(this).html());
    var col = $(this).find("fct\\:column");

    // shortform can be used in lieu of the label for URI values
    var propIRI, datatype, shortform, propLabel, ct;
    $("fct\\:column", this).each(function(j) {
      // can't figure out how to access CDATA value of the element, tried many combinations of accessors, none worked
      val = $(this).html().replace("<!--[CDATA[","").replace("]]-->","");
      //console.log(val);
      switch(j){
        case 0: propIRI = val; shortform = $(this).attr('datatype'); datatype = $(this).attr('datatype'); break;
        case 1: propLabel = val; break;
        case 2: ct = val; break;
      }
    });
    //label = processLabel(label, uri, datatype);
    //var id = createId();
    //console.log($(col[0]));
    propLabel = processLabel(propLabel, propIRI, datatype);
    //console.log($(col[0]));
    var id = createId();
    var opts = new Object();
    opts.tag = TAG_PROPERTY_OF;
    opts.parentId = 'smr_'+id;
    opts.childrenId = opts.tag + opts.parentId;
    //opts.propIRI = propIRI;
    //opts.propLabel = propLabel;
    opts.contextId = id;
    opts.propIRI = propIRI;
    opts.propLabel = propLabel;
    rows += '<tr><td class="up" id="'+opts.parentId+'"><span id="'+id+'">';
    //var propIRI = $('#groupByMenu :selected').attr('value');
    //var propLabel = $('#groupByMenu :selected').text();
    if(propIRI != GROUP_BY_NONE_VALUE){
      rows += '&nbsp;<a href="#'+id+'" onclick="javascript: addPropertyOfFacet(\''+id+'\', \''+propIRI+'\', \''+propLabel+'\')"><img src="http://icon-park.com/imagefiles/folder_icon_black.png" width="16" height="16"/></a>&nbsp;';
    }
    /*else {
      if(datatype=='uri') rows += '<a href="#'+id+'" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://www.iconsdb.com/icons/preview/black/blank-file-xxl.png" width="16" height="16" /></a>&nbsp;';
      else rows += '<a href="#'+id+'" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" width="16" height="16" /></a>&nbsp;';
    }*/
    // a property-of is always a uri datatype
    if(datatype=='uri') rows += '<a title="'+propIRI+'" href="#'+id+'" onclick="javascript:describe(\''+propIRI+'\');">'+propLabel+'</a>';
    //else
    //rows += propLabel;
    rows += '&nbsp;&nbsp;<a title="shows up in the \''+propLabel+'\' field of these records" class="count" href="#'+id+'" onclick="javascript:expandShowMe(\''+propIRI+'\', \''+datatype+'\', \''+toJSONString(opts)+'\')">'+ct+'</a>';
    rows += '</span></td></tr>';
  });
  //console.log(rows);
  $('#'+ID_SHOW_ME+'').append(rows);

  //$('#groupby').append(rows);
  //return total;
} // loadPropertiesResults


function loadGraphResults(xml){
  $('#'+ID_SHOW_ME+'').empty();

  var rows = "";
  var result = $(xml).find("fct\\:result")[0];
  showMeResultsCt = $("fct\\:row", result).length;
  if(showMePage == 0){
    $("#showMeLeftButton").attr('disabled', 'true');
    $("#showMeLeftButton").addClass('disabled');
    $('#showMeLeftButton').removeAttr('title');
  }
  else{

    $("#showMeLeftButton").removeAttr('disabled');
    $("#showMeLeftButton").removeClass('disabled');
    $('#showMeLeftButton').attr('title', 'page ' + (showMePage));

  }
  if(showMeResultsCt < SIZE_RESULT_SET) {
    $("#showMeRightButton").attr('disabled', 'true');
    $("#showMeRightButton").addClass('disabled');
    $('#showMeRightButton').removeAttr('title');
  }
  else {
    $("#showMeRightButton").removeAttr('disabled');
    $("#showMeRightButton").removeClass('disabled');
    $('#showMeRightButton').attr('title', 'page ' + (showMePage+2));

  }

  // POI: demo code
  /*if(showMePage==0 && $('#nav0 > table > tbody > tr > td.via').text() == VALUE_ROOT) rows += '<tr><td><div class="up" id="'+ID_MY_RECORDS+'"><a href="#'+id+'" onmouseover="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').addClass(\'focus\')" onmouseout="javascript:$(\'#nav'+getMainFocus().attr('class')+'\').removeClass(\'focus\')"><img src="http://icon-park.com/imagefiles/folder_icon_purple.png" width="16" height="16"/></a>&nbsp;<a title="'+VALUE_RECORD_MANAGER+'" href="#'+id+'">'+VALUE_RECORD_MANAGER+'</a> <span class="disabled">'+(Math.floor(Math.random() * 10000) + 1)+'<span></div></td></tr>';*/

  $("fct\\:row", result).each(function(i) {
    //console.log($(this).html());
    var col = $(this).find("fct\\:column");

    // shortform can be used in lieu of the label for URI values
    var graphIRI, datatype, shortform, graphLabel, ct;
    $("fct\\:column", this).each(function(j) {
      // can't figure out how to access CDATA value of the element, tried many combinations of accessors, none worked
      val = $(this).html().replace("<!--[CDATA[","").replace("]]-->","");
      //console.log(val);
      switch(j){
        case 0: graphIRI = val; shortform = $(this).attr('datatype'); datatype = $(this).attr('datatype'); break;
        case 1: graphLabel = val; break;
        case 2: ct = val; break;
      }
    });
    //label = processLabel(label, uri, datatype);
    //var id = createId();
    //console.log($(col[0]));
    graphLabel = processLabel(graphLabel, graphIRI, datatype);
    //console.log($(col[0]));
    var id = createId();
    var opts = new Object();
    opts.tag = TAG_GRAPH;
    opts.parentId = 'smr_'+id;
    opts.childrenId = opts.tag + opts.parentId;
    opts.contextId = id;
    opts.propIRI = graphIRI;
    opts.propLabel = graphLabel;
    rows += '<tr><td class="up" id="'+opts.parentId+'"><span id="'+id+'">';
    //var propIRI = $('#groupByMenu :selected').attr('value');
    //var propLabel = $('#groupByMenu :selected').text();
    if(graphIRI != GROUP_BY_NONE_VALUE){
      rows += '&nbsp;<a href="#'+id+'" onclick="javascript:setGraphFacet(\''+graphIRI+'\', \''+graphLabel+'\')"><img src="https://www.iconsdb.com/icons/preview/black/filing-cabinet-xxl.png" width="16" height="16"/></a>&nbsp;'+getFavicon(graphIRI)+'&nbsp;';
    }
    /*else {
      if(datatype=='uri') rows += '<a href="#'+id+'" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://www.iconsdb.com/icons/preview/black/blank-file-xxl.png" width="16" height="16" /></a>&nbsp;';
      else rows += '<a href="#'+id+'" onclick="javascript:setValue(\''+id+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" width="16" height="16" /></a>&nbsp;';
    }*/
    // a property is always a uri datatype
    if(datatype=='uri') rows += '<a title="'+graphIRI+'" href="#'+id+'" onclick="javascript:describe(\''+graphIRI+'\');">'+graphLabel+'</a>';
    //else
    //rows += propLabel;

    //rows += '&nbsp;&nbsp;<a title="view values" class="count" href="#'+id+'" onclick="javascript:expandShowMe(\''+propIRI+'\', \''+datatype+'\', \''+toJSONString(opts)+'\')">'+ct+'</a>';
    rows += '</span></td></tr>';
  });
  //console.log(rows);
  $('#'+ID_SHOW_ME+'').append(rows);

  //$('#groupby').append(rows);
  //return total;
} // loadPropertiesResults


function selectShowMe(isPaging){
  var showMeType = $('#showMeMenu :selected').attr('value');
  if(showMeType == VIEW_TYPE_TEXT_PROPERTIES){
    if(!_root.find('query text') || _root.find('query text').length <= 0){
      //('Please enter keywords to view corresponding text fields');
      $('#'+ID_SHOW_ME+'').empty();
      return;
    }
  }
  $('#showMeMenu').addClass('loading');
  var q = query.clone();
  setViewType(showMeType, q);
  //q.find('view').attr('limit', SIZE_RESULT_SET);
  //q.find('view').attr('offset', 0);

  if(!isPaging){
    getFocus(q).find('view').attr('offset', 0);
    getMainFocus().find('view').attr('offset', 0);
    showMePage = 0;
  }

  //takeFocus(q, q);
  fct_query(q, showMeType);
}



function expandShowMe(v, datatype, optsStr){
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
  //console.log('user expanded: ' + id);
  var children = $.createElement('table').attr('id', childrenId);
  children.attr('width', '100%');
  $('#'+parentId+'').append(children);

  var q = query.clone();
  setViewType(VIEW_TYPE_LIST_COUNT, q);
  getFocus(q).find('view').attr('offset', 0);

  //var groupByIRI = $('#groupByMenu :selected').attr('value');
  var prop;
  if(opts.tag == TAG_PROPERTY) {
    prop = $.createElement('property');
    prop.attr('iri', v);
    getFocus(q).append(prop);
    takeFocus(prop, q);
  }
  else if(opts.tag == TAG_PROPERTY_OF) {
    prop = $.createElement('property-of');
    prop.attr('iri', v);
    getFocus(q).append(prop);
    takeFocus(prop, q);
  }
  else if(opts.tag == TAG_CLASS) {
    prop = $.createElement('class');
    prop.attr('iri', v);
    getFocus(q).append(prop);
    // leave the focus where it is
  }


  //var val = $.createElement('value');
  //val.text(v);
  //val.attr('datatype', datatype);
  //val.attr('op', '=');
  //val.attr('same_as', 'yes');
  //prop.append(val);

  $('#'+parentId+'').addClass('loading');
  fct_query(q, VIEW_TYPE_LIST_COUNT, opts);

}


function loadPropertyValues(xml, opts){
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
    rows += '<tr><td class="instance" id="'+id+'"><span id="'+id+'"><a href="#'+id+'" onclick="javascript: remove(\''+_root.find('.' + getMainFocus().attr('class') + ' > [iri=\''+opts.propIRI+'\']').attr('class')+'\'); setPropertyValue(\''+id+'\', \''+NODE_TYPE_PROPERTY+'\', \''+opts.contextId+'\', \''+opts.propIRI+'\', \''+opts.propLabel+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img style="margin-left:1em" src="http://icon-park.com/imagefiles/folder_icon_black.png" width="16" height="16" /></a>&nbsp;';
    if(datatype=='uri') rows += '<a title="'+value+'" href="#'+id+'" onclick="javascript:describe(\''+value+'\');">'+label+'</a>';
    else rows += label;
    rows += '</span></td></tr>';


    //rows += '&nbsp;<a href="#'+id+'" onclick="javascript: addPropertyFacet(\''+id+'\', \''+propIRI+'\', \''+propLabel+'\', \''+sanitizeLabel(value)+'\', \''+sanitizeLabel(label)+'\', \''+datatype+'\')"><img src="http://icon-park.com/imagefiles/folder_icon_black.png" width="16" height="16"/></a>&nbsp;';

  });
  // todo: load the first record


  //console.log(rows);
  $('#'+opts.childrenId+'').append(rows);

  //$('#groupby').append(rows);
  //return total;

}

function loadPropertyOfValues(xml, opts){
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
    rows += '<tr><td class="instance" id="'+id+'"><span id="'+id+'"><a href="#'+id+'" onclick="javascript:setPropertyValue(\''+id+'\', \''+NODE_TYPE_PROPERTY_OF+'\', \''+opts.contextId+'\', \''+opts.propIRI+'\', \''+opts.propLabel+'\', \''+value+'\', \''+label+'\', \''+datatype+'\')"><img style="margin-left:1em" src="http://icon-park.com/imagefiles/folder_icon_black.png" width="16" height="16" /></a>&nbsp;<a title="'+value+'" href="#'+id+'" onclick="javascript:describe(\''+value+'\');">'+label+'</a></span></td></tr>';
  });
  // todo: load the first record


  //console.log(rows);
  $('#'+opts.childrenId+'').append(rows);

  //$('#groupby').append(rows);
  //return total;

}

function loadClassInstances(xml, opts){
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

