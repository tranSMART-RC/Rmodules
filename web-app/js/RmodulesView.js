
var RmodulesView = function () {}

RmodulesView.prototype.clear_high_dimensional_input = function (div) {
    //Clear the drag and drop div.
    var qc = Ext.get(div);

    for (var i = qc.dom.childNodes.length - 1; i >= 0; i--) {
        var child = qc.dom.childNodes[i];
        qc.dom.removeChild(child);
    }
    clearHighDimDataSelections(div);
    clearSummaryDisplay(div);
}

RmodulesView.prototype.register_drag_drop = function () {
    //Set up drag and drop for Dependent and Independent variables on the data association tab.
    //Get the Independent DIV
    var independentDiv = Ext.get("divIndependentVariable");

    dtgI = new Ext.dd.DropTarget(independentDiv, {ddGroup : 'makeQuery'});
    dtgI.notifyDrop =  dropOntoCategorySelection;
}


RmodulesView.prototype.get_parameters_for_mrna = function (jobType) {
    var _div_name = "divIndependentVariable";

    return {
        "job_type" : jobType,
        "data_type": window[_div_name + 'markerType'],
        "assayConstraints": {
        "patient_set": [GLOBAL.CurrentSubsetIDs[1], GLOBAL.CurrentSubsetIDs[2]],
            "ontology_term": readConceptVariables("divIndependentVariable"),
            "trial_name": null
    },
        "dataConstraints": {
        "search_keyword_ids": [window[_div_name + 'pathway']],
            "disjunctions": null
    },
        projections: ["zscore"]
    }
}

RmodulesView.prototype.get_parameters_for_mirna = function (jobType) {
    var _div_name = "divIndependentVariable";

    return {
        "job_type" : jobType,
        "data_type": window[_div_name + 'markerType'],
        "assayConstraints": {
            "patient_set": [GLOBAL.CurrentSubsetIDs[1], GLOBAL.CurrentSubsetIDs[2]],
            "ontology_term": readConceptVariables("divIndependentVariable"),
            "trial_name": null
        },
        "dataConstraints": {
            "mirnas": [window[_div_name + 'pathwayName']],
            "disjunctions": null
        },
        projections: ["zscore"]
    }
}


RmodulesView.prototype.get_parameters_for_rbm = function (jobType) {
    var _div_name = "divIndependentVariable";

    return {
        "job_type" : jobType,
        "data_type": window[_div_name + 'markerType'],
        "assayConstraints": {
            "patient_set": [GLOBAL.CurrentSubsetIDs[1], GLOBAL.CurrentSubsetIDs[2]],
            "ontology_term": readConceptVariables("divIndependentVariable"),
            "trial_name": null
        },
        "dataConstraints": {
            "disjunctions": null
        },
        projections: ["zscore"]
    }
}

RmodulesView.prototype.get_parameters_for_proteomics = function (jobType) {
    var _div_name = "divIndependentVariable";

    return {
        "job_type" : jobType,
        "data_type": window[_div_name + 'markerType'],
        "assayConstraints": {
            "patient_set": [GLOBAL.CurrentSubsetIDs[1], GLOBAL.CurrentSubsetIDs[2]],
            "ontology_term": readConceptVariables("divIndependentVariable"),
            "trial_name": null
        },
        "dataConstraints": {
            "disjunctions": null
        },
        projections: ["zscore"]
    }
}

RmodulesView.prototype.get_analysis_constraints = function (jobType) {
    var _div_name = "divIndependentVariable";
    var data_type = window[_div_name + 'markerType'];
    if (data_type == 'Gene Expression') {
        return this.get_parameters_for_mrna(jobType);
    } else if (data_type == "QPCR MIRNA") {
        return this.get_parameters_for_mirna(jobType);
    } else if (data_type == "RBM") {
        return this.get_parameters_for_rbm(jobType);
    } else if (data_type == "PROTEOMICS") {
        return this.get_parameters_for_proteomics(jobType);
    }
}