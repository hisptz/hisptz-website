
<script type="text/javascript">


    dhis2.util.on('dhis2.de.event.formReady', function (event, ds) {
        var lastObtainedPointValue = {};
        var lastPossibleMaximumScore= {};
        $('h2#orgunit_header').text($('input#selectedOrganisationUnit').val());
        var runInitialSetups = function() {

            Get rid of the "No value" options
            $($('td').find(':radio')).each(function(selectOptionFieldIndex,selectOptionFieldObject){
                if($(selectOptionFieldObject).attr('value') == '') $($(selectOptionFieldObject).closest('label')).remove();
                if($(selectOptionFieldObject).attr('value') == 'true'){
                    var label = $(selectOptionFieldObject).closest('label');
                    var children = $(label).children();

                    $($(children)).each(function(index, value){
                        if($(value).not(':radio')) $(value).text('Applicable');
                        console.log(children);
                    });
                }

                if($(selectOptionFieldObject).attr('value') == 'false'){
                    var label = $(selectOptionFieldObject).closest('label');
                    var children = $(label).children();
                    $($(children)).each(function(index, value){
                        if($(value).not(':radio')) $(value).text('Not Applicable');
                    });
                }
            });

            //Place data-rowid attribute to input fields of that row for easy access
            var rowIncrement=0;//For Offseting row increments
            $($('tr').find('input,:radio, td')).each(function(fieldIndex,fieldObject){
                $(fieldObject).attr('data-rowid',$(fieldObject).parent().parent().attr('id')).attr('data-colnum',(fieldIndex-rowIncrement));
                if($(fieldObject).is("td")) { $(fieldObject).attr('data-rowid',$(fieldObject).parent().attr('id'));};
                //Disable for selection fields not applicable
                if($(fieldObject).is(':checked')) {
                    console.log(fieldObject);
                    if($(fieldObject).val()=="false" ) {//Disable field and clear value and max point
                        var associatedInputField=$('input[data-rowid="'+$(fieldObject).attr('data-rowid')+'"][data-colnum="'+(Number($(fieldObject).attr('data-colnum'))-1)+'"]');
                        var associatedPossibleMaximum=$('input[data-rowid="'+$(fieldObject).attr('data-rowid')+'"][data-colnum="'+(Number($(fieldObject).attr('data-colnum'))-3)+'"]');
                        lastObtainedPointValue[$(fieldObject).attr('data-rowid')]=associatedInputField.val();
                        lastPossibleMaximumScore[$(fieldObject).attr('data-rowid')]=associatedPossibleMaximum.val();
                        console.log("if set to false to restore value");
                        console.log(associatedPossibleMaximum.hide());
                        associatedInputField.val('');
                        dhis2.de.updateIndicators();
                        associatedInputField.attr('readonly','readonly');
                        associatedPossibleMaximum.val("");
                        associatedPossibleMaximum.hide();
                    }else if($(fieldObject).val()=="true" ) {
                        var associatedInputField=$('input[data-rowid="'+$(fieldObject).attr('data-rowid')+'"][data-colnum="'+(Number($(fieldObject).attr('data-colnum'))-1)+'"]');
                        var associatedPossibleMaximum=$('input[data-rowid="'+$(fieldObject).attr('data-rowid')+'"][data-colnum="'+(Number($(fieldObject).attr('data-colnum'))-3)+'"]');
                        lastPossibleMaximumScore[$(fieldObject).attr('data-rowid')]=associatedPossibleMaximum.val();
                        dhis2.de.updateIndicators();
                        associatedPossibleMaximum.show();
                    }
                };
            });

            //Make quality scoring field read-only
            $('input[data-rowid="quality_score_row"]').attr('readonly','readonly');
        }
        var runCalculationsAndPersistance = function() {
            var totalScoreDenominator=0;
            for(columnIncr=3;columnIncr<200;columnIncr+=11){
                var col=columnIncr+3;
                if($('select[data-colnum="'+col+'"]').val()==='true'){
                    totalScoreDenominator += Number($('input[data-colnum="'+columnIncr+'"]').val());
                }
            }
            console.log("run calculation");
            console.log(totalScoreDenominator);
            $('td[data-rowid="quality_score_row"][data-colnum="'+(columnIncr-1)+'"]').text(totalScoreDenominator);
            $('input[data-colnum="'+(columnIncr+3)+'"]').val( Number( $('input[data-colnum="'+(columnIncr+1)+'"]').val()/$('td[data-rowid="quality_score_row"][data-colnum="'+(columnIncr-1)+'"]').text() * 100 ).toFixed(1) );
            var inputFieldId = $('input[data-colnum="'+(columnIncr+3)+'"]').attr('id');
            var split = dhis2.de.splitFieldId( inputFieldId );
            saveVal( split.dataElementId, split.optionComboId, inputFieldId );
            //Save max score for the facility
            var facilityMaxScoreId='y3H4nKfUeAJ-uGIJ6IdkP7Q-val';
            var facilityScoreObtainedId='CSiv5JgYn3y-uGIJ6IdkP7Q-val';
            $('#'+facilityMaxScoreId).val(totalScoreDenominator);
            var obtainedPoints=$('#'+facilityScoreObtainedId).val(Number( $('input[data-colnum="'+(columnIncr+1)+'"]').val()));
            var splitMaxScore = dhis2.de.splitFieldId(facilityMaxScoreId);
            var splitObtainedPoints = dhis2.de.splitFieldId(facilityScoreObtainedId);
            saveVal( splitMaxScore.dataElementId, splitMaxScore.optionComboId, facilityMaxScoreId );
            saveVal( splitObtainedPoints.dataElementId, splitObtainedPoints.optionComboId, facilityScoreObtainedId );
        }
        var changeDenominatorAndClearObtainedPoints = function(changedField) {
            if( ! $.isEmptyObject(changedField) ) {
                if($(changedField).is("select")){
                    var associatedInputField=$('input[data-rowid="'+$(changedField).attr('data-rowid')+'"][data-colnum="'+(Number($(changedField).attr('data-colnum'))-1)+'"]');
                    var associatedPossibleMaximum=$('input[data-rowid="'+$(changedField).attr('data-rowid')+'"][data-colnum="'+(Number($(changedField).attr('data-colnum'))-3)+'"]');
                    if($(changedField).val()=="false" ) {//Disable field and clear value and max point
                        lastObtainedPointValue[$(changedField).attr('data-rowid')]=associatedInputField.val();
                        lastPossibleMaximumScore[$(changedField).attr('data-rowid')]=associatedPossibleMaximum.val();
                        console.log("Before clear");
                        console.log(associatedPossibleMaximum.val());
                        associatedInputField.val('');dhis2.de.updateIndicators();
                        associatedInputField.attr('readonly','readonly');
                        associatedPossibleMaximum.hide();
                        //associatedPossibleMaximum.val("");
                    }else if($(changedField).val()=="true" ) {//Enable field and restore max point and recent value
                        associatedInputField.removeAttr('readonly');
                        associatedInputField.val(lastObtainedPointValue[$(changedField).attr('data-rowid')]);
                        dhis2.de.updateIndicators();
                        associatedPossibleMaximum.show();
                        associatedPossibleMaximum.val(lastPossibleMaximumScore[$(changedField).attr('data-rowid')]);
                    }

                };
            }
        }

        //Only run for  quartelry assessment form
        if ($('select#selectedDataSetId>option[value="' + $('#selectedDataSetId').val() + '"]').text() === "RBF_Quarterly Quality Activities/Areas Assessment Results of the Facility") {

            var params = {
                periodId : $( '#selectedPeriodId').val(),
                dataSetId : $( '#selectedDataSetId' ).val(),
                organisationUnitId : dhis2.de.getCurrentOrganisationUnit(),
                multiOrganisationUnit: dhis2.de.multiOrganisationUnit
            };

            var cc = dhis2.de.getCurrentCategoryCombo();
            var cp = dhis2.de.getCurrentCategoryOptionsQueryValue();
            if ( cc && cp )	{params.cc = cc;params.cp = cp;}
            $.ajax({ url: 'getDataValues.action', data: params, dataType: 'json', success: function( json ) { runInitialSetups();
                //runCalculationsAndPersistance();
                var totalScoreDenominator=0;
                for(columnIncr=3;columnIncr<200;columnIncr+=11){
                    var col=columnIncr+3;
                    if($('select[data-colnum="'+col+'"]').val()==='true'){
                        totalScoreDenominator += Number($('input[data-colnum="'+columnIncr+'"]').val());
                    }
                }
                console.log("run calculation");
                console.log("lets check");
                console.log(totalScoreDenominator);
                $('td[data-rowid="quality_score_row"][data-colnum="'+(columnIncr-1)+'"]').text(totalScoreDenominator);
            } });

            $('input[name="entryfield"],select[name="entryselect"]').change(function () {
                changeDenominatorAndClearObtainedPoints(this);
                runCalculationsAndPersistance();
            });
        }
    });
</script>
<style type="text/css">#cde table {
    border-collapse: collapse;
}

#cde table, #cde th, #cde td {
    border: 1px solid #c0c0c0;
}

#cde td, #cde th {
    height: 30px;
    padding: 10px;
    margin: 10px;
}

.cde-greyfield {
    background-color: #e0e0e0;
}
</style>
<p>&nbsp;</p>

<p>&nbsp;</p>

<div id="cde">
    <h2 id="orgunit_header" style="text-align:center;">&nbsp;</h2>

<h2 style="text-align:center;">Summary of Quartery Quality Activities/ Areas Assessment Results of the Facility</h2>

<table cellpadding="0" cellspacing="0">
    <thead>
    <tr>
    <th>N</th>
    <th>Dimension</th>
    <th>Possible Maximum</th>
<th>Obtained Points</th>
<th style="text-align:center;">%</th>
    <th>Observations</th>
    </tr>
    </thead>
    <tbody>
    <tr id="hygiene_and_sanitation_row">
    <td>1</td>
    <td>Hygiene and sanitation</td>
<td style="text-align:center;"><input id="indicatorNpsqPj4iHib" indicatorid="NpsqPj4iHib" name="indicator" readonly="readonly" title="X_RBF_Hygiene and sanitation" value="[ X_RBF_Hygiene and sanitation ]" /></td>
    <td><input id="E9EGnOJ3WKu-uGIJ6IdkP7Q-val" max="9" min="0" style="width:7em;" title="E9EGnOJ3WKu - RBF_ObtainedPoints_Hygiene and sanitation - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Hygiene and sanitation default ]" />&nbsp;&nbsp;<input id="YiouQX1hVyV-uGIJ6IdkP7Q-val" style="width:7em;" title="YiouQX1hVyV - RBF_ObtainedPoints_Hygiene and sanitation_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Hygiene and sanitation_applicable default ]" /></td>
    <td><input id="indicatorRarKICWiOat" indicatorid="RarKICWiOat" name="indicator" readonly="readonly" title="PS_Hygiene and Sanitation" value="[ PS_Hygiene and Sanitation ]" /></td>
    <td><input id="SdbxpkQyTFs-uGIJ6IdkP7Q-val" title="SdbxpkQyTFs - Observation_Hygiene and sanitation - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Hygiene and sanitation default ]" /></td>
    </tr>
    <tr id="privacy_row">
    <td>2</td>
    <td>Privacy</td>
    <td style="text-align:center;"><input id="indicatorp5vVCzHcjiq" indicatorid="p5vVCzHcjiq" name="indicator" readonly="readonly" title="X_RBF_Privacy" value="[ X_RBF_Privacy ]" /></td>
    <td><input id="bscFEWA1o0n-uGIJ6IdkP7Q-val" max="4" min="0" style="width:7em;" title="bscFEWA1o0n - RBF_ObtainedPoints_Privacy - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Privacy default ]" />&nbsp;&nbsp;<input id="t4dO8wHxhbN-uGIJ6IdkP7Q-val" style="width:7em;" title="t4dO8wHxhbN - RBF_ObtainedPoints_Privacy_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Privacy_applicable default ]" /></td>
    <td><input id="indicatornbmWw6HKOOw" indicatorid="nbmWw6HKOOw" name="indicator" readonly="readonly" title="PS_Privacy" value="[ PS_Privacy ]" /></td>
    <td><input id="Vn1Os6FC8y6-uGIJ6IdkP7Q-val" title="Vn1Os6FC8y6 - Observation_Privacy - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Privacy default ]" /></td>
    </tr>
    <tr id="water_supply_row">
    <td>3</td>
    <td>Water supply</td>
<td style="text-align:center;"><input id="indicatorkNn4lHBbkYD" indicatorid="kNn4lHBbkYD" name="indicator" readonly="readonly" title="X_RBF_Water supply" value="[ X_RBF_Water supply ]" /></td>
    <td><input id="XAbHX9ADiPi-uGIJ6IdkP7Q-val" max="4" min="0" style="width:7em;" title="XAbHX9ADiPi - RBF_ObtainedPoints_Water supply - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Water supply default ]" />&nbsp;&nbsp;<input id="vmej4SQC0lK-uGIJ6IdkP7Q-val" style="width:7em;" title="vmej4SQC0lK - RBF_ObtainedPoints_Water supply_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Water supply_applicable default ]" /></td>
    <td><input id="indicatorkNONLDZavQB" indicatorid="kNONLDZavQB" name="indicator" readonly="readonly" title="PS_Water supply" value="[ PS_Water supply ]" /></td>
    <td><input id="wWSsNul5IId-uGIJ6IdkP7Q-val" title="wWSsNul5IId - Observation_Water supply - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Water supply default ]" /></td>
    </tr>
    <tr id="waste_management_row">
    <td>4</td>
    <td>Waste management</td>
<td style="text-align:center;"><input id="indicatoraFCnerGZj6u" indicatorid="aFCnerGZj6u" name="indicator" readonly="readonly" title="X_RBF_Waste management" value="[ X_RBF_Waste management ]" /></td>
    <td><input id="jhu1YuW9l0n-uGIJ6IdkP7Q-val" max="6" min="0" style="width:7em;" title="jhu1YuW9l0n - RBF_ObtainedPoints_Waste management - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Waste management default ]" />&nbsp;&nbsp;<input id="zpWthUk6Vs4-uGIJ6IdkP7Q-val" style="width:7em;" title="zpWthUk6Vs4 - RBF_ObtainedPoints_Waste management_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Waste management_applicable default ]" /></td>
    <td><input id="indicatorPNuYfZbrE0J" indicatorid="PNuYfZbrE0J" name="indicator" readonly="readonly" title="PS_Waste management" value="[ PS_Waste management ]" /></td>
    <td><input id="WH6XkKxhRcl-uGIJ6IdkP7Q-val" max="9" min="0" style="width:132px;height:26;" title="WH6XkKxhRcl - Observation_Waste management - uGIJ6IdkP7Q - default - TEXT" type="number" value="[ Observation_Waste management default ]" /></td>
    </tr>
    <tr id="anc_row">
    <td>5</td>
    <td>ANC</td>
    <td style="text-align:center;"><input id="indicatorTBtfnerlqOP" indicatorid="TBtfnerlqOP" name="indicator" readonly="readonly" title="X_RBF_ANC" value="[ X_RBF_ANC ]" /></td>
    <td><input id="DW5O1PPFw8F-uGIJ6IdkP7Q-val" max="13" min="0" style="width:7em;" title="DW5O1PPFw8F - RBF_ObtainedPoints_ANC - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_ANC default ]" />&nbsp;&nbsp;<input id="hy3CYYU3Uhd-uGIJ6IdkP7Q-val" style="width:7em;" title="hy3CYYU3Uhd - RBF_ObtainedPoints_ANC_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_ANC_applicable default ]" /></td>
    <td><input id="indicatortRoA3ubKE37" indicatorid="tRoA3ubKE37" name="indicator" readonly="readonly" title="PS_ANC" value="[ PS_ANC ]" /></td>
    <td><input id="d1fESmlHz3R-uGIJ6IdkP7Q-val" title="d1fESmlHz3R - Observation_ANC - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_ANC default ]" /></td>
    </tr>
    <tr id="labor_ward_row">
    <td>6</td>
    <td>Labour ward</td>
<td style="text-align:center;"><input id="indicatorQojHupydmAG" indicatorid="QojHupydmAG" name="indicator" readonly="readonly" title="X_RBF_Labour ward" value="[ X_RBF_Labour ward ]" /></td>
    <td><input id="BS2h0CFHyga-uGIJ6IdkP7Q-val" max="13" min="0" style="width:7em;" title="BS2h0CFHyga - RBF_ObtainedPoints_Labour ward - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Labour ward default ]" />&nbsp;&nbsp;<input id="LYuFFbeDEqZ-uGIJ6IdkP7Q-val" style="width:7em;" title="LYuFFbeDEqZ - RBF_ObtainedPoints_Labour ward_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Labour ward_applicable default ]" /></td>
    <td><input id="indicatorKEW7j8ixmLD" indicatorid="KEW7j8ixmLD" name="indicator" readonly="readonly" title="PS_Labour ward" value="[ PS_Labour ward ]" /></td>
    <td><input id="mZsVk6nIPnA-uGIJ6IdkP7Q-val" title="mZsVk6nIPnA - Observation_Labour ward - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Labour ward default ]" /></td>
    </tr>
    <tr id="postnatal_care_row">
    <td>7</td>
    <td>Post-natal care</td>
<td style="text-align:center;"><input id="indicatorYDTDzobLrpY" indicatorid="YDTDzobLrpY" name="indicator" readonly="readonly" title="X_RBF_Post-natal care" value="[ X_RBF_Post-natal care ]" /></td>
    <td><input id="EETWczeHo0l-uGIJ6IdkP7Q-val" max="9" min="0" style="width:7em;" title="EETWczeHo0l - RBF_ObtainedPoints_Post-natal care - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Post-natal care default ]" />&nbsp;&nbsp;<input id="ZLaVSHJOSAK-uGIJ6IdkP7Q-val" style="width:7em;" title="ZLaVSHJOSAK - RBF_ObtainedPoints_Post-natal care_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Post-natal care_applicable default ]" /></td>
    <td><input id="indicatorN6aA3adbHfT" indicatorid="N6aA3adbHfT" name="indicator" readonly="readonly" title="PS_Post-natal care" value="[ PS_Post-natal care ]" /></td>
    <td><input id="F3GHP7U680x-uGIJ6IdkP7Q-val" title="F3GHP7U680x - Observation_Post-natal care - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Post-natal care default ]" /></td>
    </tr>
    <tr id="maternity_death_audits_row">
    <td>8</td>
    <td>Maternity death audits</td>
<td style="text-align:center;"><input id="indicatorLse8V26R5zf" indicatorid="Lse8V26R5zf" name="indicator" readonly="readonly" title="X_RBF_Maternity death audits" value="[ X_RBF_Maternity death audits ]" /></td>
    <td><input id="usBwRAzpEqh-uGIJ6IdkP7Q-val" max="10" min="0" style="width:7em;" title="usBwRAzpEqh - RBF_ObtainedPoints_Material death audits - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Material death audits default ]" />&nbsp;&nbsp;<input id="wuMWTyLYjt4-uGIJ6IdkP7Q-val" style="width:7em;" title="wuMWTyLYjt4 - RBF_ObtainedPoints_Material death audits_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Material death audits_applicable default ]" /></td>
    <td><input id="indicatorD2AmWRErd2e" indicatorid="D2AmWRErd2e" name="indicator" readonly="readonly" title="PS_Maternal death audits" value="[ PS_Maternal death audits ]" /></td>
    <td><input id="SY1FRftZiRZ-uGIJ6IdkP7Q-val" title="SY1FRftZiRZ - Observation_Maternal death audits - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Maternal death audits default ]" /></td>
    </tr>
    <tr id="perinatal_death_audits_row">
    <td>9</td>
    <td>Perinatal death audits</td>
<td style="text-align:center;"><input id="indicatorWEkJz7HQIU2" indicatorid="WEkJz7HQIU2" name="indicator" readonly="readonly" title="X_RBF_Perinatal death audits" value="[ X_RBF_Perinatal death audits ]" /></td>
    <td><input id="HMn57IOxNea-uGIJ6IdkP7Q-val" max="10" min="0" style="width:7em;" title="HMn57IOxNea - RBF_ObtainedPoints_Perinatal death audits - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Perinatal death audits default ]" />&nbsp;&nbsp;<input id="WFXrJja9Ybt-uGIJ6IdkP7Q-val" style="width:7em;" title="WFXrJja9Ybt - RBF_ObtainedPoints_Perinatal death audits_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Perinatal death audits_applicable default ]" /></td>
    <td><input id="indicatorzgEFQBshKcm" indicatorid="zgEFQBshKcm" name="indicator" readonly="readonly" title="PS_Perinatal death audits" value="[ PS_Perinatal death audits ]" /></td>
    <td><input id="pXzVU3EuLbz-uGIJ6IdkP7Q-val" title="pXzVU3EuLbz - Observation_Perinatal death audits - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Perinatal death audits default ]" /></td>
    </tr>
    <tr id="family_planning_row">
    <td>10</td>
    <td>Family planning</td>
<td style="text-align:center;"><input id="indicatorDP1PFJe19Yu" indicatorid="DP1PFJe19Yu" name="indicator" readonly="readonly" title="X_RBF_Family planning" value="[ X_RBF_Family planning ]" /></td>
    <td><input id="L5GcPvo3tN5-uGIJ6IdkP7Q-val" max="17" min="0" style="width:7em;" title="L5GcPvo3tN5 - RBF_ObtainedPoints_Family planning - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Family planning default ]" />&nbsp;&nbsp;<input id="jHSHSXgkDkR-uGIJ6IdkP7Q-val" style="width:7em;" title="jHSHSXgkDkR - RBF_ObtainedPoints_Family planning_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Family planning_applicable default ]" /></td>
    <td><input id="indicatorovhrPOeeJ3O" indicatorid="ovhrPOeeJ3O" name="indicator" readonly="readonly" title="PS_Familiy Planning" value="[ PS_Familiy Planning ]" /></td>
    <td><input id="ezlz3Ixb9GM-uGIJ6IdkP7Q-val" title="ezlz3Ixb9GM - Observation_Family planning - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Family planning default ]" /></td>
    </tr>
    <tr id="immunization_row">
    <td>11</td>
    <td>Immunization</td>
    <td style="text-align:center;"><input id="indicatoruMA1ttgn2sW" indicatorid="uMA1ttgn2sW" name="indicator" readonly="readonly" title="X_RBF_Immunization" value="[ X_RBF_Immunization ]" /></td>
    <td><input id="HV9jpDPZ0T5-uGIJ6IdkP7Q-val" max="7" min="0" style="width:7em;" title="HV9jpDPZ0T5 - RBF_ObtainedPoints_Immunization - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Immunization default ]" />&nbsp;&nbsp;<input id="JABfufE3RfT-uGIJ6IdkP7Q-val" style="width:7em;" title="JABfufE3RfT - RBF_ObtainedPoints_Immunization_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Immunization_applicable default ]" /></td>
    <td><input id="indicatorWiXj2w8lP9T" indicatorid="WiXj2w8lP9T" name="indicator" readonly="readonly" title="PS_Immunization" value="[ PS_Immunization ]" /></td>
    <td><input id="PAdd3KRLogV-uGIJ6IdkP7Q-val" title="PAdd3KRLogV - Observation_Immunization - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Immunization default ]" /></td>
    </tr>
    <tr id="nutrition_for_under_five_children_row">
    <td>12</td>
    <td>Nutrition for under-five children</td>
<td style="text-align:center;"><input id="indicatorhskLL0A5PIo" indicatorid="hskLL0A5PIo" name="indicator" readonly="readonly" title="X_RBF_Nutrition for under-five children" value="[ X_RBF_Nutrition for under-five children ]" /></td>
    <td><input id="XMLbK760weD-uGIJ6IdkP7Q-val" max="4" min="0" style="width:7em;" title="XMLbK760weD - RBF_ObtainedPoints_Nutrition for under-five children - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Nutrition for under-five children default ]" />&nbsp;&nbsp;<input id="zoe3NPk9umK-uGIJ6IdkP7Q-val" style="width:7em;" title="zoe3NPk9umK - RBF_ObtainedPoints_Nutrition for under-five children_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Nutrition for under-five children_applicable default ]" /></td>
    <td><input id="indicatorv9mEGcogQTY" indicatorid="v9mEGcogQTY" name="indicator" readonly="readonly" title="PS_Nutrion for under-five children" value="[ PS_Nutrion for under-five children ]" /></td>
    <td><input id="REhjmnH5PCZ-uGIJ6IdkP7Q-val" title="REhjmnH5PCZ - Observation_Nutrition for under-five children - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Nutrition for under-five children default ]" /></td>
    </tr>
    <tr id="pharmacy_row">
    <td>13</td>
    <td>Pharmacy</td>
    <td style="text-align:center;"><input id="indicatorehot7GtYrAv" indicatorid="ehot7GtYrAv" name="indicator" readonly="readonly" title="X_RBF_Pharmacy" value="[ X_RBF_Pharmacy ]" /></td>
    <td><input id="FtrFwltcv1N-uGIJ6IdkP7Q-val" max="22" min="0" style="width:7em;" title="FtrFwltcv1N - RBF_ObtainedPoints_Pharmacy - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Pharmacy default ]" />&nbsp;&nbsp;<input id="hgnZQfvM5Bd-uGIJ6IdkP7Q-val" style="width:7em;" title="hgnZQfvM5Bd - RBF_ObtainedPoints_Pharmacy_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Pharmacy_applicable default ]" /></td>
    <td><input id="indicatorfDPrEDYMA4U" indicatorid="fDPrEDYMA4U" name="indicator" readonly="readonly" title="PS_Pharmacy" value="[ PS_Pharmacy ]" /></td>
    <td><input id="wgl7k3Lmqk0-uGIJ6IdkP7Q-val" title="wgl7k3Lmqk0 - Observation_Pharmacy - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Pharmacy default ]" /></td>
    </tr>
    <tr id="community_row">
    <td>14</td>
    <td>Community</td>
    <td style="text-align:center;"><input id="indicatorrGfbbjEFFAz" indicatorid="rGfbbjEFFAz" name="indicator" readonly="readonly" title="X_RBF_Community" value="[ X_RBF_Community ]" /></td>
    <td><input id="uSSS9CHRVuo-uGIJ6IdkP7Q-val" max="5" min="0" style="width:7em;" title="uSSS9CHRVuo - RBF_ObtainedPoints_Community - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Community default ]" />&nbsp;&nbsp;<input id="Rb9aeK8ulot-uGIJ6IdkP7Q-val" style="width:7em;" title="Rb9aeK8ulot - RBF_ObtainedPoints_Community_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Community_applicable default ]" /></td>
    <td><input id="indicatorea4NupdSmAW" indicatorid="ea4NupdSmAW" name="indicator" readonly="readonly" title="PS_Community" value="[ PS_Community ]" /></td>
    <td><input id="nnyPrDlunTl-uGIJ6IdkP7Q-val" title="nnyPrDlunTl - Observation_Community - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Community default ]" /></td>
    </tr>
    <tr id="community_health_fund">
    <td>15</td>
    <td>Community health fund</td>
<td style="text-align:center;"><input id="indicatoredH7gC2UwaI" indicatorid="edH7gC2UwaI" name="indicator" readonly="readonly" title="X_RBF_Community health fund" value="[ X_RBF_Community health fund ]" /></td>
    <td><input id="yDHY7PC5qh1-uGIJ6IdkP7Q-val" max="10" min="0" style="width:7em;" title="yDHY7PC5qh1 - RBF_ObtainedPoints_Commuinity health fund - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Commuinity health fund default ]" />&nbsp;&nbsp;<input id="tW2g316vJ7M-uGIJ6IdkP7Q-val" style="width:7em;" title="tW2g316vJ7M - RBF_ObtainedPoints_Commuinity health fund_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Commuinity health fund_applicable default ]" /></td>
    <td><input id="indicatorKzakl7lCkSG" indicatorid="Kzakl7lCkSG" name="indicator" readonly="readonly" title="PS_Community health fund" value="[ PS_Community health fund ]" /></td>
    <td><input id="ZGSad2VELkY-uGIJ6IdkP7Q-val" title="ZGSad2VELkY - Observation_Community health fund - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Community health fund default ]" /></td>
    </tr>
    <tr id="facility_profile_reports">
    <td>16</td>
    <td>Facility profile reports</td>
<td style="text-align:center;"><input id="indicatorvY5fIhLQsBq" indicatorid="vY5fIhLQsBq" name="indicator" readonly="readonly" title="X_RBF_Facility profile reports" value="[ X_RBF_Facility profile reports ]" /></td>
    <td><input id="kXq84v0QeOi-uGIJ6IdkP7Q-val" max="6" min="0" style="width:7em;" title="kXq84v0QeOi - RBF_ObtainedPoints_Facility profile reports - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Facility profile reports default ]" />&nbsp;&nbsp;<input id="bMlCXd8ADsQ-uGIJ6IdkP7Q-val" style="width:7em;" title="bMlCXd8ADsQ - RBF_ObtainedPoints_Facility profile reports_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Facility profile reports_applicable default ]" /></td>
    <td><input id="indicatorbiYKVKq9rYi" indicatorid="biYKVKq9rYi" name="indicator" readonly="readonly" title="PS_Facility profile reports" value="[ PS_Facility profile reports ]" /></td>
    <td><input id="Fm5qTXy7t74-uGIJ6IdkP7Q-val" title="Fm5qTXy7t74 - Observation_Facility profile reports - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Facility profile reports default ]" /></td>
    </tr>
    <tr id="transparency_row">
    <td>17</td>
    <td>Transparency</td>
    <td style="text-align:center;"><input id="indicatorl7lTCLrdgBX" indicatorid="l7lTCLrdgBX" name="indicator" readonly="readonly" title="X_RBF_Transparency" value="[ X_RBF_Transparency ]" /></td>
    <td><input id="ZgszdSBBePh-uGIJ6IdkP7Q-val" max="5" min="0" style="width:7em;" title="ZgszdSBBePh - RBF_ObtainedPoints_Transparency - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Transparency default ]" />&nbsp;&nbsp;<input id="qfAplnig9kF-uGIJ6IdkP7Q-val" style="width:7em;" title="qfAplnig9kF - RBF_ObtainedPoints_Transparency_applicable - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Transparency_applicable default ]" /></td>
    <td><input id="indicatoriSdiICQF5bT" indicatorid="iSdiICQF5bT" name="indicator" readonly="readonly" title="PS_Transparency" value="[ PS_Transparency ]" /></td>
    <td><input id="nqwIyQ2B427-uGIJ6IdkP7Q-val" title="nqwIyQ2B427 - Observation_Transparency - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Transparency default ]" /></td>
    </tr>
    <tr id="client_satisfaction_row">
    <td>18</td>
    <td>Client Satisfaction</td>
<td style="text-align:center;"><input id="indicatorAf6v9iVoU7l" indicatorid="Af6v9iVoU7l" name="indicator" readonly="readonly" title="X_RBF_Client Satisfaction" value="[ X_RBF_Client Satisfaction ]" /></td>
    <td><input id="XGoPYd2QU1F-uGIJ6IdkP7Q-val" max="20" min="0" style="width:7em;" title="XGoPYd2QU1F - RBF_ObtainedPoints_Client Satisfaction - uGIJ6IdkP7Q - default - NUMBER" type="number" value="[ RBF_ObtainedPoints_Client Satisfaction default ]" />&nbsp;&nbsp;<input id="FitpRURqKrD-uGIJ6IdkP7Q-val" style="width:7em;" title="FitpRURqKrD - RBF_ObtainedPoints_Client Satisfaction_application - uGIJ6IdkP7Q - default - BOOLEAN" value="[ RBF_ObtainedPoints_Client Satisfaction_application default ]" /></td>
    <td><input id="indicatorqLG2ObWa1sy" indicatorid="qLG2ObWa1sy" name="indicator" readonly="readonly" title="PS_Client Satisfaction" value="[ PS_Client Satisfaction ]" /></td>
    <td><input id="mscmT2dR6kq-uGIJ6IdkP7Q-val" title="mscmT2dR6kq - Observation_Client Satisfaction - uGIJ6IdkP7Q - default - TEXT" value="[ Observation_Client Satisfaction default ]" /></td>
    </tr>
    <tr id="quality_score_row" style="font-weight:bolder">
    <td>&nbsp;</td>
<td>TOTAL</td>
<td id="Total" style="text-align:center;">&nbsp;</td>
<td><input id="indicatorKaH6qHpJthu" indicatorid="KaH6qHpJthu" name="indicator" readonly="readonly" title="RBF_Total Obtained Points" value="[ RBF_Total Obtained Points ]" /></td>
    <td><input data-info="used" id="H50EYE8g13h-uGIJ6IdkP7Q-val" title="H50EYE8g13h - RBF_Quality_score_facility - uGIJ6IdkP7Q - default - NUMBER" value="[ RBF_Quality_score_facility default ]" /></td>
    <td>&nbsp;</td>
</tr>
</tbody>
</table>
</div>

<div style="display:none;">
    <p>&nbsp;Max facility score<input id="y3H4nKfUeAJ-uGIJ6IdkP7Q-val" title="y3H4nKfUeAJ - RBF_Maximum_Score   - uGIJ6IdkP7Q - default - NUMBER" value="[ RBF_Maximum_Score   default ]" /></p>
    </div>

    <div style="display:none;">
    <p>&nbsp;ObtainedPoint&nbsp;<input id="CSiv5JgYn3y-uGIJ6IdkP7Q-val" title="CSiv5JgYn3y - RBF_Obtained points for facility - uGIJ6IdkP7Q - default - NUMBER" value="[ RBF_Obtained points for facility default ]" /></p>
    </div>

