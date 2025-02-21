var deviceVersionString = "-1",
    serverVersionString = "-1";

function versionCompare() {
    if(deviceVersionString.match("-1") || serverVersionString.match("-1")){
        return 0;
    }

    var deviceVersion = deviceVersionString.split(".");
    var serverVersion = serverVersionString.split(".");

    var len = Math.min(deviceVersion.length, serverVersion.length);
    for (var i = 0; i < len; i++) {
        if (parseInt(deviceVersion[i]) > parseInt(serverVersion[i])) {
            return 0;
        }
        if (parseInt(deviceVersion[i]) < parseInt(serverVersion[i])) {
            jQuery('#versionText').css("display", "block");
            jQuery('#newVersion').text(serverVersionString);
            jQuery('#versionURL').attr("href", "https://albilab.cz/update/AlbiLAB_v_" + serverVersionString + "_firmware.bin");
            jQuery('#followUpdateInstruction').css("display", "block");
            return 0;
        }
    } 
}

function versionGet() {
    console.log("get version");
    jQuery.getJSON( "/info", function(obj) {
        deviceVersionString = obj["version"];
        console.log("device:" + obj["version"]);
        jQuery('#currentVersion').text(deviceVersionString);
        versionCompare();
    });

    var url = "https://albilab.cz/update/version.json";
    console.log(url);
    jQuery.getJSON( url, function(obj2) {
        console.log(obj2);
        serverVersionString = obj2["version"];
        console.log("server:" + obj2["version"]);
        versionCompare();
    });
}

function read_json() {
    jQuery.getJSON("/info", function(e) {
        var t = Math.round(100 * e.processing.red / e.processing.maxValueRBW),
            a = Math.round(100 * e.processing.blue / e.processing.maxValueRBW),
            i = Math.round(100 * e.processing.white / e.processing.maxValueRBW),
            r = e.processing.timeSet,
            s = e.processing.timeElapsed;
        if (jQuery("#trimmer_red").data("percent", t), jQuery("#trimmer_blue").data("percent", a), jQuery("#trimmer_white").data("percent", i), jQuery("#trimmer_red").gaugeMeter(), jQuery("#trimmer_blue").gaugeMeter(), jQuery("#trimmer_white").gaugeMeter(), 0 == e.processing.enabled) {
            jQuery("#time_sun").data("percent", 100), jQuery("#time_moon").data("percent", 100);
            var o = Math.floor(r / 60),
                n = Math.floor(r % 60);
            jQuery("#time_sun").data("text", o + ":" + String(n).padStart(2, "0")), o = Math.floor((1440 - r) / 60), n = Math.floor((1440 - r) % 60), jQuery("#time_moon").data("text", o + ":" + String(n).padStart(2, "0"))
        } else if (s > r) {
            var l = 100 - Math.round((s - r) * 100 / (1440 - r)),
                o = Math.floor((1440 - s) / 60),
                n = Math.floor((1440 - s) % 60);
            jQuery("#time_sun").data("percent", 0), jQuery("#time_moon").data("percent", l), jQuery("#time_moon").data("text", o + ":" + String(n).padStart(2, "0")), o = Math.floor(r / 60), n = Math.floor(r % 60), jQuery("#time_sun").data("text", o + ":" + String(n).padStart(2, "0"))
        } else {
            var l = 100 - Math.round(100 * s / r),
                o = Math.floor((r - s) / 60),
                n = Math.floor((r - s) % 60);
            jQuery("#time_sun").data("percent", l), jQuery("#time_moon").data("percent", 0), jQuery("#time_sun").data("text", o + ":" + String(n).padStart(2, "0")), o = Math.floor((1440 - r) / 60), n = Math.floor((1440 - r) % 60), jQuery("#time_moon").data("text", o + ":" + String(n).padStart(2, "0"))
        }
        if (jQuery("#time_sun").gaugeMeter(), jQuery("#time_moon").gaugeMeter(), 1 == e.watering.enabled) {
            jQuery("#watering_status").hide(), jQuery("#time_watering").show(), jQuery("#img_automation").addClass("icon_green"), jQuery("#img_automation").removeClass("icon_gray");
            var m, o, n, d, g = e.watering.period,
                u = e.watering.remainingTime;
            e.processing.enabled ? (o = Math.floor(u / 60), n = Math.floor(u % 60), d = Math.floor((g - u) / g * 100)) : (o = Math.floor(g / 60), n = Math.floor(g % 60), d = 100), m = Math.floor(o / 24), jQuery("#time_watering").data("percent", d), o >= 100 ? (jQuery("#time_watering").data("append", "days"), jQuery("#time_watering").data("text", m)) : (jQuery("#time_watering").data("append", null), jQuery("#time_watering").data("text", o + ":" + String(n).padStart(2, "0"))), jQuery("#time_watering").gaugeMeter(), jQuery("#div_watering").show(), jQuery("#watering_level").show(), (m = Math.floor((o = Math.floor(g / 60)) / 24)) > 1 ? jQuery("#watering_time_every").text("Every " + m + " days") : jQuery("#watering_time_every").text("Every " + o + " hours"), jQuery("#watering_time_pump_on").text("Pump is on for " + e.watering.pumpOnTime + "s"), e.watering.moistureEnable ? (jQuery("#watering_level").text("Soil moisture level < " + e.watering.moistureLevel + "%"), jQuery("#watering_level").show()) : jQuery("#watering_level").hide()
        } else jQuery("#time_watering").hide(), jQuery("#div_watering").hide(), jQuery("#watering_status").show(), jQuery("#img_automation").removeClass("icon_green"), jQuery("#img_automation").addClass("icon_gray");
        if ("none" != e.sensors.soilMoisture.type) {
            var d = e.sensors.soilMoisture.values.moisture;
            d < 0 ? d = 0 : d > 100 && (d = 100), jQuery("#value_soil_moisture").text(d + "%");
            var c = !1;
            1 == e.watering.enabled ? e.watering.moistureLevel > d && (c = !0) : d < 70 && (c = !0), !0 == c ? (jQuery("#img_soil_moisture").removeClass("icon_blue"), jQuery("#img_soil_moisture").addClass("icon_red")) : (jQuery("#img_soil_moisture").addClass("icon_blue"), jQuery("#img_soil_moisture").removeClass("icon_red")), jQuery("#img_soil_moisture").removeClass("icon_gray")
        } else jQuery("#value_soil_moisture").text("Not set"), jQuery("#img_soil_moisture").removeClass("icon_blue"), jQuery("#img_soil_moisture").addClass("icon_gray");
        if ("none" != e.sensors.thermoHumid.type) {
            var v = e.sensors.thermoHumid.values.humidity;
            let p = e.sensors.thermoHumid.values.temperature.toFixed(1),
                w = v.toFixed(1);
            p < -140 ? (jQuery("#value_temp_humid").text("Disconnected"), jQuery("#img_thermometer").removeClass("icon_blue"), jQuery("#img_thermometer").addClass("icon_gray")) : (-1 == v ? jQuery("#value_temp_humid").text(p + "\xb0C") : jQuery("#value_temp_humid").text(p + "\xb0C, " + w + "%"), jQuery("#img_thermometer").addClass("icon_blue"), jQuery("#img_thermometer").removeClass("icon_gray"))
        } else jQuery("#value_temp_humid").text("Not set"), jQuery("#img_thermometer").removeClass("icon_blue"), jQuery("#img_thermometer").addClass("icon_gray");
        if ("none" != e.sensors.waterSwitch.type) {
            var c = e.sensors.waterSwitch.values.waterLowLevel;
            jQuery("#img_water_level").removeClass("icon_gray"), !0 == c ? (jQuery("#value_water_level").text("Low water level"), jQuery("#img_water_level").removeClass("icon_blue"), jQuery("#img_water_level").addClass("icon_red")) : (jQuery("#value_water_level").text("Enough water"), jQuery("#img_water_level").addClass("icon_blue"), jQuery("#img_water_level").removeClass("icon_red"))
        } else jQuery("#value_water_level").text("Not set"), jQuery("#img_water_level").removeClass("icon_blue"), jQuery("#img_water_level").removeClass("icon_red"), jQuery("#img_water_level").addClass("icon_gray");
        if ("none" != e.actuators.fan.type) {
            var f = e.actuators.fan.pin;
            jQuery("#value_fan").text("Set, OUT" + f), jQuery("#img_fan").addClass("icon_blue"), jQuery("#img_fan").removeClass("icon_gray")
        } else jQuery("#value_fan").text("Not set"), jQuery("#img_fan").removeClass("icon_blue"), jQuery("#img_fan").addClass("icon_gray");
        if ("none" != e.actuators.waterPump.type) {
            var f = e.actuators.waterPump.pin;
            jQuery("#value_water_pump").text("Set, OUT" + f), jQuery("#img_water_pump").addClass("icon_blue"), jQuery("#img_water_pump").removeClass("icon_gray")
        } else jQuery("#value_water_pump").text("Not set"), jQuery("#img_water_pump").removeClass("icon_blue"), jQuery("#img_water_pump").addClass("icon_gray");
        var $ = -1;
        if ($ != e.plantPhase)
            for (var h = document.getElementsByClassName("icon_green"), C = 0; C < h.length; C++) h[C].classList.contains("icon_flower") && h[C].classList.remove("icon_green");
        switch ($ = e.plantPhase, e.plantPhase) {
            case 0:
                jQuery("#div_phase_manual").show(), jQuery("#div_phase_defined").hide();
                break;
            case 1:
                jQuery("#div_phase_manual").hide(), jQuery("#div_phase_defined").show(), jQuery("#phase_selected").text("Germination"), jQuery("#img_germination").addClass("icon_green");
                break;
            case 2:
                jQuery("#div_phase_manual").hide(), jQuery("#div_phase_defined").show(), jQuery("#phase_selected").text("Leaf Development"), jQuery("#img_leaf_development").addClass("icon_green");
                break;
            case 3:
                jQuery("#div_phase_manual").hide(), jQuery("#div_phase_defined").show(), jQuery("#phase_selected").text("Vegetative Phase"), jQuery("#img_vegetative").addClass("icon_green");
                break;
            case 4:
                jQuery("#div_phase_manual").hide(), jQuery("#div_phase_defined").show(), jQuery("#phase_selected").text("Inflorescence"), jQuery("#img_inflorescence").addClass("icon_green");
                break;
            case 5:
                jQuery("#div_phase_manual").hide(), jQuery("#div_phase_defined").show(), jQuery("#phase_selected").text("Fruit Development"), jQuery("#img_fruit").addClass("icon_green")
        }
    })
}

jQuery(document).ready(function() {
    jQuery.getJSON("/info", function(e) {
        
    });

    var timeSun = document.getElementById("time_sun");
    
    if(timeSun != null){
        read_json();
        jQuery('.GaugeMeter').gaugeMeter();
		setInterval(function() {
			read_json();
		}, 1000);
	}
    versionGet();

    jQuery(function () {
        var $images = jQuery('.albiLAB_img');
        var lastLoadIndex = 0;
        var loadNextImage = function () {
           if ($images.length === lastLoadIndex) {
               return;
           }
           $images.eq(lastLoadIndex).attr('src', $images.eq(lastLoadIndex).attr('data-src'));
           lastLoadIndex += 1;
        };
        $images.on('load', loadNextImage);
        loadNextImage();
     });
});