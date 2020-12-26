
const getSectorsLocator = (arr) => arr.map((loc) => loc.substring(0, 2));
const getBigQuadsLocator = (arr) => arr.map((loc) => loc.substring(0, 4));
function OptionGenerator($targetContainer, iterateObject) {
    $targetContainer.empty();
    Object.keys(iterateObject).forEach(function (item) {
        $targetContainer.prepend(`<option id="_${item}">${item}</option>`);
    });
    $targetContainer.selectpicker('refresh');
}

function tableRowGenerator(propMode, totalQSOs, totalSectorsPropMode, totalBigLocators) {
    switch(propMode){
        case 'AS':
            propIcon = 'airplanemode_active';
            break;
        case 'TR':
            propIcon = 'layers';
            break;
        case 'MS':
            propIcon = 'layers_clear';
            break;
        case 'AU':
            propIcon = 'signal_wifi_4_bar';
            break;
        case 'AUE':
            propIcon = 'signal_wifi_4_bar';
            break;
        case 'BS':
        propIcon = 'replay';
            break;
        case 'EME':
        propIcon = 'brightness_3';
            break;
        case 'ECH':
        propIcon = 'repeat';
            break;
        case 'ES':
        propIcon = 'cloud_done';
            break;
        case 'F2':
        propIcon = 'multiline_chart';
            break;
        case 'FAI':
        propIcon = 'multiline_chart';
            break;
        case 'INTERNET':
        propIcon = 'redo';
            break;
        case 'ION':
        propIcon = 'multiline_chart';
            break;
        case 'IRL':
        propIcon = 'person';
            break;
        case 'RPT':
        propIcon = 'redo';
            break;
        case 'SAT':
        propIcon = 'satellite';
            break;
        case 'TEP':
        propIcon = 'public';
            break;
        default:
            propIcon = 'looks';
        break;
    }
    return `<tr>
    <td><i class="material-icons">${propIcon}</i></td>
    <td><span class="badge bg-purple">${propMode}</span></td>
    <td><span class="badge bg-blue">${totalQSOs}</span></td>
    <td><span class="badge bg-green">${totalSectorsPropMode}</span></td>
    <td><span class="badge bg-teal">${totalBigLocators}</span></td>
    <tr>`
}

function cardTableGenerator(band, dataTable) {
    return `
    <div class="card">
         <div class="header">
       <h2>ДИАПАЗОН: ${band}
          <small>Basic example without any additional modification classes</small>
       </h2>
<ul class="header-dropdown m-r--5">
    <li class="dropdown">
        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <i class="material-icons">more_vert</i>
        </a>
        <ul class="dropdown-menu pull-right">
            <li><a href="javascript:void(0);">Action</a></li>
            <li><a href="javascript:void(0);">Another action</a></li>
            <li><a href="javascript:void(0);">Something else here</a></li>
        </ul>
    </li>
</ul>
</div>
<div class="body table-responsive">
<table class="table">
    <thead>
        <tr>
            <th></th>
            <th>ВИД ПРОХОЖДЕНИЯ</th>
            <th>ВСЕГО СВЯЗЕЙ </th>
            <th>СЕКТОРА</th>
            <th>КВАДРАТЫ</th>
            
        </tr>
    </thead>
    <tbody class="_${band}">
        ${dataTable}
    </tbody>
</table>
</div>
</div>
    `
}

function initTable($locators, $callsign, $targetElement, callsigns) {
    const locator = $locators.selectpicker('val');
    const callsign = $callsign.selectpicker('val');
    $targetElement.empty();
    let TotalSectors = [];
    let TotalBigLocator = [];

    Object.keys(callsigns[callsign][locator]).forEach(function (band) {
        let dataTable = ``;
        Object.keys(callsigns[callsign][locator][band]).forEach(function (propMode) {
            let bigLocators = getBigQuadsLocator([...callsigns[callsign][locator][band][propMode].reduce((acc, elem) => acc.add(elem.gridsquare), new Set())]);
            TotalBigLocator.push(...bigLocators);
            let Sectors = [...getSectorsLocator(bigLocators.sort((a, b) => a > b ? 1 : -1)).reduce((acc, elem) => acc.add(elem), new Set())];
            const totalQSOs = callsigns[callsign][locator][band][propMode].length;
            const totalSectorsPropMode = Sectors.length;
            const totalBigLocators = bigLocators.length;
            dataTable += tableRowGenerator(propMode, totalQSOs, totalSectorsPropMode, totalBigLocators);
        });
        $targetElement.prepend(cardTableGenerator(band, dataTable));
    });

    TotalBigLocator = [...TotalBigLocator.sort((a, b) => a > b ? 1 : -1).reduce((acc, elem) => acc.add(elem), new Set())];
    TotalSectors = [...getSectorsLocator(TotalBigLocator.sort((a, b) => a > b ? 1 : -1)).reduce((acc, elem) => acc.add(elem), new Set())];
    return {
        totalBigLocator: TotalBigLocator,
        totalSectors: TotalSectors
    }
}

function addingStations(callsigns, callsign, locator, _map){
    Object.keys(callsigns[callsign][locator]).forEach(function (band) {
        Object.keys(callsigns[callsign][locator][band]).forEach(function (propMode) {
            Object.keys(callsigns[callsign][locator][band][propMode]).forEach(function (item) {
                const qso = callsigns[callsign][locator][band][propMode][item];
                _map.addMarker(qso.lat_long, qso.call, qso.gridsquare, qso.band, qso.prop_mode, qso.mode)
            });
        }); 
    });
}

(function () {
    let callsigns = {};
    locatorToLatLngConvert = {};

    callsigns = JSON.parse($('#callsigns').text());
    $('#callsigns').remove();
    locatorToLatLngConvert = JSON.parse($("#locator-to-lat-lng-convert").text());
    $("#locator-to-lat-lng-convert").remove();
    let $locators = $(".locators");
    let $callsign = $(".callsign");
    let $tablesBands = $(".bands-tables");
    let $sectorsLocator = $(".sectors-locator");
    let $bigLocator = $(".big-locator");
    let $map = $('#map');
    let callsign = $callsign.val();
    OptionGenerator($locators, callsigns[callsign]);

    let qthLocTotalWidgets = initTable($locators, $callsign, $tablesBands, callsigns);

    $sectorsLocator.countTo({ from: 0, to: qthLocTotalWidgets.totalSectors.length });
    $bigLocator.countTo({ from: 0, to: qthLocTotalWidgets.totalBigLocator.length });

    let locator = $locators.selectpicker('val');

    let _map = new LocatorMap(locatorToLatLngConvert[locator], $map, callsign, locator)
    addingStations(callsigns, callsign, locator, _map);
   
    $callsign.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        OptionGenerator($locators, callsigns[e.target.value]);
    });

    $locators.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        qthLocTotalWidgets = initTable($locators, $callsign, $tablesBands, callsigns);

        $sectorsLocator.countTo({ from: 0, to: qthLocTotalWidgets.totalSectors.length });

        $bigLocator.countTo({ from: 0, to: qthLocTotalWidgets.totalBigLocator.length });
        console.log(qthLocTotalWidgets)
        locator = $locators.selectpicker('val');
        callsign = $callsign.val();
        _map.setHome(locatorToLatLngConvert[locator], callsign, locator);
        addingStations(callsigns, _map);
    });
})();
