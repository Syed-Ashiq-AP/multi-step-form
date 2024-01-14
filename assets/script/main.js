let cs = 1, cp = 1, ca = [], my = false;

let cpz ={true:[9,12,15],false:[90,120,150]},apz={true:[1,2,2],false:[10,20,20]};

let cfs = { 1: 'validate()', 2: 'true', 3: 'true', 4: 'true' }, pld = { true: ['$90/yr', '$120/yr', '$150/yr'], false: ['$9/mo', '$12/mo', '$15/mo'] }, apd = { true: ['+$10/yr', '+$20/yr', '+$20/yr'], false: ['+$1/mo', '+$2/mo', '+$2/mo'] };

let pls = {1:'Arcade',2:'Advanced',3:'Pro'},mpm={true:'Yearly',false:'Monthly'},
plpz ={false:[9,12,15],true:[90,120,150]},aprz={false:[1,2,2],true:[10,20,20]};


function next_s() {
    if (eval(cfs[cs])) {
        document.getElementById("stpc-" + cs).style.display = "none";
        document.getElementById("sc-"+cs).classList.toggle("st-active")
        cs++;
        document.getElementById("sc-"+cs).classList.toggle("st-active")
        if (cs > 1 && document.getElementById("gb-bt").classList.contains("hidden")) {
            document.getElementById("gb-bt").classList.toggle("hidden")
        }
        document.getElementById("stpc-" + cs).style.display = "flex";
        if (cs == 4) {
            document.getElementById("ns-bt").classList.toggle("hidden")
            document.getElementById("cf-bt").classList.toggle("hidden")
            calc_total()
        }
    }
}

function back_s() {
    document.getElementById("stpc-" + cs).style.display = "none";
    document.getElementById("sc-"+cs).classList.toggle("st-active")
    cs--;
    document.getElementById("sc-"+cs).classList.toggle("st-active")
    if (cs == 1) {
        document.getElementById("gb-bt").classList.toggle("hidden")
    }
    if (cs < 4 && !document.getElementById("cf-bt").classList.contains("hidden")) {
        document.getElementById("ns-bt").classList.toggle("hidden")
        document.getElementById("cf-bt").classList.toggle("hidden")
    }
    document.getElementById("stpc-" + cs).style.display = "flex";
    if (cs < 0) {
        document.getElementById("gb-bt").classList.toggle("hidden")
    }
}

function tq_s() {
    document.getElementById("acc").style.display = "none";
    document.getElementById("stpc-4" ).style.display = "none";
    document.getElementById("stpc-5" ).style.display = "flex";
}

function validate_input() {
    let name = document.getElementById("name").value,
        email = document.getElementById("email").value,
        phone = document.getElementById("phone").value;

    if (name == "") {
        gen_err("name-e", "Please enter your name")
        return false
    } else if (email == "") {
        gen_err("email-e", "Please enter your Email")
        return false
    } else if (phone == "") {
        gen_err("phone-e", "Please enter your Phone Number")
        return false
    } else {
        if (name.length < 3) {
            gen_err("name-e", "Please enter a valid Name")
            return false
        } else if (email.includes("@") == false) {
            gen_err("email-e", "Please enter a valid Email")
            return false
        } else if (email.includes(".com") == false) {
            gen_err("email-e", "Please enter a valid Email")
            return false
        } else if (phone.toString().length < 10) {
            gen_err("phone-e", "Please enter a valid Phone Number")
            return false
        } else {
            return true
        }
    }
}

function gen_err(id, msg) {
    document.getElementById(id).innerText = msg
    setTimeout(() => { document.getElementById(id).innerText = "" }, 3000);
}

function sel_pln(i) {
    if (cp != i) {
        document.getElementById("pln-" + cp).classList.toggle("p-s")
        document.getElementById("pln-" + i).classList.toggle("p-s")
        cp = i
        document.getElementById("pl-pp").innerText = pls[i] + "("+mpm[my]+")"
        document.getElementById("pl-pz").innerText = pld[my][i-1]
    }
}

function s_my(ch) {
    my = ch
    let ppr = document.getElementsByClassName("p-pr"),
     tmf = document.getElementsByClassName("tmf"),
     apr = document.getElementsByClassName("apr"),
     rpr= document.getElementsByClassName("rpr");
    for (let i = 0; i < ppr.length; i++) {
        ppr[i].innerHTML = pld[my][i]
        apr[i].innerHTML = apd[my][i]
        rpr[i].innerHTML = apd[my][i]
        tmf[i].classList.toggle("hidden")
        document.getElementById("pl-pz").innerText = pld[my][cp-1]
        document.getElementById("pl-pp").innerText = pls[cp] + "("+mpm[my]+")"
    }
    document.getElementById("my").classList.toggle("p-c")
    document.getElementById("mm").classList.toggle("p-c")

}

function s_ad(i) {
    if (!ca.includes(i)) {
        ca.push(i)
    } else {
        ca.splice(ca.indexOf(i), 1)
    }
    document.getElementById("ad-" + i).classList.toggle("ad-s");
    document.getElementById("fi-" + i).classList.toggle("hidden");
    let ch =document.getElementById("ad-" + i).children[0].children[0].children[0]
    if(ch.checked){ch.checked =false;}else{ch.checked =true;}
}

function calc_total() {
    let ta=0
    for(let i=0;i<ca.length;i++){
        ta+=aprz[my][ca[i]-1]
    }
    let total = plpz[my][cp-1]+ta;
    let ts = ''
    if(my){
        ts = "$"+ total.toString()+ "/yr"
        document.getElementById("f-tpp").innerText = 'Total (per year)'
    }else{
        ts = "+$"+ (total).toString()+ "/mo"
        document.getElementById("f-tpp").innerText = 'Total (per month)'
    }
    document.getElementById("f-tpz").innerText = ts 
    
}

function change(){
    document.getElementById("stpc-4" ).style.display = "none";
    document.getElementById("stpc-2" ).style.display = "flex";
    document.getElementById("ns-bt").classList.toggle("hidden")
    document.getElementById("cf-bt").classList.toggle("hidden")
    document.getElementById("sc-2").classList.toggle("st-active")
    document.getElementById("sc-4").classList.toggle("st-active")
    cs = 2

}