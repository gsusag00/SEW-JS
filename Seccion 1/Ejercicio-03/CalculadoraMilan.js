class CalculadoraMilan {

    op = '';
    left = '';
    right = '';
    point = false;
    has_eval = false;
    memory = 0;

    constructor() {
        this.init();
    }

    init() {
        this.op = '';
        this.left = '';
        this.right = '';
        this.point = false;
        this.memory = 0;
    }

    operacion(val) {
        if(this.right) {
            this.igual();
        }
        this.op = val;
        this.update_screen();
    }

    numeros(val) {
        if (!this.op) {
            if(this.has_eval) {
                this.left = val.toString();
                this.has_eval = false;
            } else {
                this.left += val.toString();
            }
        }
        else {
            this.right += val.toString();
        }
        this.update_screen();
    }

    punto() {
        if(this.right) {
            if(!this.right.includes('.')) {
                this.right += '.';
            }
        } else {
            if(!this.left.includes('.')){
                this.left += '.';
            }
        }
        this.update_screen();
    }

    cpress() {
        this.init();
        this.update_screen();
    }

    cepress() {
        this.screen = '';
        this.op = '';
        this.left = '';
        this.point = false;
        this.update_screen();
    }

    changesign() {
        if(this.right) {
            if(this.right.charAt(0) === '-') {
                this.right = this.right.substring(1);
            }
            else {
                this.right = '-' + this.right;
            }
        }
        else {
            if(this.left.charAt(0) === '-') {
                this.left = this.left.substring(1);
            }
            else {
                this.left = '-' + this.left;
            }
        }
        this.update_screen();
    }

    sqrt() {
        if(this.right) {
            this.right = 'Math.sqrt(' + this.right + ')';
        }
        else {
            this.left = 'Math.sqrt(' + this.left + ')';
        }
        this.update_screen();
    }

    porcentage() {
        if(this.right) {
            if(this.op === '+' || this.op === '-') {
                this.right = '(' + this.left + '/ 100 ) * ' + this.right;
            }
            else {
                this.right = '(' + this.right + ' / 100 )'; 
            }
        }
        else {
            this.left = '( ' + this.left + ' / 100)'
        }
        this.igual();
    }

    mrcpress() {

    }

    m_minus() {

    }

    m_plus() {

    }

    igual() {
        try {
            var toEval = eval(this.left + this.op + this.right);
            this.has_eval = true;
            this.update_screen(toEval);
        } catch (err) {
            this.screen = 'Error';
            document.getElementById('screen').value = this.screen;
        }
    }

    update_screen(toEval=null) {
        var val;
        if(toEval === null) {
            val = this.left + this.op + this.right;
        }
        else {
            val = toEval;
        }
        if(this.screen === 'Error') {
            this.init();
            this.update_screen();
        }
        if(this.right && toEval !== null) {
            this.left = val.toString();
            this.op = '';
            this.right = '';
        }
        document.getElementById('pantalla').value = val;
        console.log('Left value: ' + this.left);
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
    if(event.key === '=') {
        calc.igual();
    }
    if(event.key === 's') {
        calc.sqrt();
    }
    if(event.key === '%') {
        calc.porcentage();
    }
    if(event.key === 'c') {
        calc.cpress();
    }
    if(event.key === 'e') {
        calc.cepress();
    }
});