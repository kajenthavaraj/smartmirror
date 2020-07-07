const fs = require('fs');

function wifiConfig(s,p){
    console.log('button pressed')
    var country = "CA";
    var ssid = s
    var psk = p

    var wpaSup = 
    `ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    update_config = 1
    country=${country}

    network={
        ssid="${ssid}"
        psk="${psk}"
        key-mgmt=WPA-PSK
    }`;

    fs.writeFileSync('writeMe.txt', wpaSup);
    //fs.writeFileSync('/etc/wpa_supplicant/wpa_supplicant.conf', wpaSup);
    //require('reboot').reboot();
}
