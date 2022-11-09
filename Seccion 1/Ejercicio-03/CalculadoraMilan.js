class CalculadoraMilan {

    constructor() {
        this.init();
    }

    init() {
        this.screen = '';
        this.op = '';
        this.left_op = '';
        this.memoria = 0;
        this.point = false;
    }

    operacion(val) {
        this.op = val;
        this.update_screen();
    }

    numeros(val) {
        if (this.op === '') {
            if(val === '.') {
                if (!isNaN(this.left_op.slice(-1)) && !this.point) {
                    this.left_op += val;
                    this.point = true;
                }
            }
            else 
                this.left_op += val;

        } 
        else {
            this.left_op += this.op + val;
            this.point = false;
        }
        this.op = '';
        this.update_screen();
    }

    cpress() {

    }

    cepress() {

    }

    changesign() {

    }

    squareroot() {

    }

    modulus() {

    }

    mrcpress() {

    }

    m_minus() {

    }

    m_plus() {

    }

    igual() {
        try {
            var toEval = eval(this.left_op + this.op);
            this.update_screen(toEval);
        } catch (err) {
            this.screen = 'Error';
            document.getElementById('screen').value = this.screen;
        }
    }

    update_screen(toEval=null) {
        if(toEval === null) {
            this.screen = this.left_op + this.op;
        }
        else {
            this.screen = toEval;
            this.left_op = toEval;
            this.op = '';
        }
        if(this.screen === 'Error') {
            this.init();
            this.update_screen();
        }
        document.getElementById('screen').value = this.screen;
    }

}

var calc = new CalculadoraMilan();
var ops = ['+','-','/','*'];
document.addEventListener('keydown',function (event) {
    if(!isNaN(event.key) || event.key === '.') {
        calc.numeros(event.key);
    }
    if(ops.includes(event.key)) {
        calc.operacion(event.key);
    }
    if(event.key === 'Enter') {
        calc.igual();
    }
});