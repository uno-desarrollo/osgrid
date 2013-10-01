/**
 * OsGrid
 */
var osGrid = function(data, options, pageSize, divId, cssClass, name) {

	this.data = data;

	this.init = function(page)
	{
		$("#" + divId).html("");
		var total = data.length;
		var thead = "<thead><tr>";
		var tbody = "<tbody>";
		var txtField = null;
		var cont = 0;
		var min = (page * pageSize) - pageSize;
		if(page == 1)
		{
			min = 0;
		}
		var max = (min + pageSize) - 1;

		$.each(options, function(title, field){
			thead = thead + "<th>" + title + "</th>";
		});
		$.each(data,  function(index,val){
			if(cont >= min && cont <= max)
			{
				tbody = tbody + "<tr>";
				$.each(options, function(title, field){
					eval("txtField = val." + field + ";");
					tbody = tbody + "<td>" + txtField + "</td>";
				});	
				tbody = tbody + "</tr>";
			}
			cont++;
		});
		tbody = tbody + "</tbody>";
		thead = thead + "</tr></thead>";
		if(cssClass != null)
		{
			var table = "<table class=\"" + cssClass + "\">" + thead + tbody + "</table>";
		}else{
			var table = "<table>" + thead + tbody + "</table>";
		}
		$("#" + divId).append(table);

		var pages = Math.ceil(total / pageSize);
		var paginator = "<ul class=\"pagination pull-right\">";

		for(var i = 1; i <= pages; i++)
		{
			var classPaginator = null;
			if(i == page)
			{
				classPaginator = "active";
			}
			paginator = paginator + "<li class=\"" + classPaginator + "\"><a href=\"javascript: void(0)\" onclick=\"" + name + ".renderPage(" + parseInt(i) + ")\">" + parseInt(i) + "</a></li>";
		}
		paginator = paginator + "</ul>";
		$("#" + divId).append(paginator);
	}

	this.debug = function()
	{
		console.log(this);
	}

	this.renderPage = function(page)
	{
		this.init(page);
	}
};