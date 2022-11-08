class CalculadoraMilan {

    constructor() {
        this.op = '';
        this.left_op = '';
        this.memoria = 0;
    }

    numeros(val) {
        this.left_op += val;
        this.update_screen();
    }

    update_screen() {
        document.getElementById('screen').value = this.op + this.left_op;
    }

}

var calc = new CalculadoraMilan();

document.addEventListener('keydown',function (event) {
    if(!isNaN(event.key)) {
        calc.numeros(event.key);
    }
});