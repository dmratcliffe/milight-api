module.exports = {
    sanitize: function(s){
        //this class converts words in arrays to the corresponding sones
        //TODO: Impliment this lol
        //each zone has an array of valid words, '*' is special, and means it is included in sayin 'all'
        s_cln = s.replace(/\s/g, '').toLowerCase(); //remove spaces, set lower
        zone0 = ["0", "all"];
        zone1 = ["1", "one", "bedroom", "thebedroom"];
        zone2 = ["2", "two", "thestairs", "stairwell", "thestaiwell", "stairs"];
        zone3 = ["3", "livingroom", "thelivingroom"];
        zone4 = ["4"];

        //TODO: Add multiples together by splitting on the 'AND'
        zones = [];

        if(zone0.includes(s_cln)){
            zones.push(1);
            zones.push(2);
            zones.push(3);
            zones.push(4);
        }
        if(zone1.includes(s_cln))
            zones.push(1);
        if(zone2.includes(s_cln))
            zones.push(2);
        if(zone3.includes(s_cln))
            zones.push(3);
        if(zone4.includes(s_cln))
            zones.push(4);


        return zones;
    }
}