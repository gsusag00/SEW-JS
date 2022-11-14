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
        this.memory = 0;
    }

    suma() {
        this.operacion('+');
    }

    resta() {
        this.operacion('-');
    }

    division() {
        this.operacion('/');
    }

    mult() {
        this.operacion('*');
    }

    operacion(val) {
        if (this.has_eval) {
            this.op = '';
            this.right = '';
            this.has_eval = false;
        } else {
            if (this.right) {
                this.doCalc();
                this.op = '';
                this.right = '';
            }
        }
        this.op = val;
        this.update_screen();
    }

    numeros(val) {
        if (this.has_eval) {
            this.left = val.toString();
            this.has_eval = false;
            this.op = '';
            this.right = '';
        } else {
            if (!this.op) {
                this.left += val.toString();
            }
            else {
                this.right += val.toString();
            }
        }
        this.update_screen();
    }

    punto() {
        if (this.has_eval) {
            this.left = '.';
            this.has_eval = false;
            this.op = '';
            this.right = '';
        } else {
            if (this.op) {
                if (!this.right.includes('.')) {
                    this.right += '.';
                }
            } else {
                if (!this.left.includes('.')) {
                    this.left += '.';
                }
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
        this.right = '';
        this.update_screen();
    }

    changesign() {
        if (this.right) {
            if (this.right.charAt(0) === '-') {
                this.right = this.right.substring(1);
            }
            else {
                this.right = '-' + this.right;
            }
        }
        else {
            if (this.left.charAt(0) === '-') {
                this.left = this.left.substring(1);
            }
            else {
                this.left = '-' + this.left;
            }
        }
        this.update_screen();
    }

    sqrt() {
        if (this.right) {
            this.right = 'Math.sqrt(' + this.right + ')';
        }
        else {
            this.left = 'Math.sqrt(' + this.left + ')';
        }
        this.update_screen();
    }

    porcentage() {
        if (this.right) {
            if (this.op === '+' || this.op === '-') {
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
        if (!this.op) {
            this.left = this.memory;
        } else {
            if (!this.right) {
                this.right = this.memory;
            } else {
                this.doCalc();
                this.memory = Number(this.left);
                this.op = '';
                this.right = '';
            }
        }
        this.update_screen();
    }

    m_minus() {
        this.doCalc();
        this.memory -= Number(this.left);
        this.update_screen();
    }

    m_plus() {
        this.doCalc();
        this.memory += Number(this.left);
        this.update_screen();
    }

    eval(val) {
        var toEval;
        try {
            toEval = eval(val);
        } catch (err) {
            this.screen = 'Error';
            document.getElementById('screen').value = this.screen;
            this.op = '';
            this.left = '';
            this.right = '';
        }
        return toEval;
    }

    doCalc() {
        this.left = this.eval(this.left + this.op + this.right);
    }

    igual() {
        this.doCalc();
        this.has_eval = true;
        this.update_screen();
    }

    update_screen() {
        var val;
        if (!this.has_eval) {
            val = this.left + this.op + this.right;
        }
        else {
            val = this.left;
        }
        document.getElementById('pantalla').value = val;
    }

}

class CalculadoraCienfitica extends CalculadoraMilan {

    trig = 'DEG';
    shift = false;
    hypr = false;
    open_parentesis = 0;

    constructor() {
        super();
    }

    operacion(val) {
        if (this.right) {
            if (this.has_eval) {
                this.right = '';
                this.has_eval = !this.has_eval;
            }
            else {
                this.left = this.left + this.op + this.right;
                this.right = '';
            }
        }
        this.op = val;
        this.update_screen();
    }

    deg() {
        if (this.trig === 'DEG') {
            this.trig = 'RAD';
        }
        else if (this.trig === 'RAD') {
            this.trig = 'GRAD';
        }
        else {
            this.trig = 'DEG';
        }
        console.log(this.trig);
    }

    hyp() {
        this.hypr = !this.hypr
        if(this.hypr) {
            document.querySelector("input[value='sin']").value = 'sinh';
            document.querySelector("input[value='cos']").value = 'cosh';
            document.querySelector("input[value='tan']").value = 'tanh';
        } else {
            document.querySelector("input[value='sinh']").value = 'sin';
            document.querySelector("input[value='cosh']").value = 'cos';
            document.querySelector("input[value='tanh']").value = 'tan';
        }
    }

    fe() {

    }

    mc() {
        //Memory clear
    }

    mr() {
        //Memory recovery
    }

    ms() {
        //Memory store
    }

    square() {
        this.undoEval();
        if (this.right) {
            this.right = 'Math.pow(' + this.right + ',2)'
        } else {
            this.left = 'Math.pow(' + this.left + ',2)'
        }
        this.update_screen();
    }

    xtoy() {

    }


    convertAngle(val) {
        if (this.trig === 'DEG') {
            return val * Math.PI / 180;
        } else if (this.trig === 'GRAD') {
            return val * Math.PI / 200;
        }
        return val;
    }

    sin() {
        if (this.right) {
            this.right = this.convertAngle(this.right);
            this.right = this.eval('Math.sin(' + this.right + ')');
        }
        else {
            this.left = this.convertAngle(this.left);
            this.left = this.eval('Math.sin(' + this.left + ')')
        }
        this.update_screen();
    }

    cos() {
        //Añadir el shift para el acos, asin, atan
        if (this.right) {
            this.right = this.convertAngle(this.right);
            this.right = this.eval('Math.cos(' + this.right + ')');
        }
        else {
            this.left = this.convertAngle(this.left);
            this.left = this.eval('Math.cos(' + this.left + ')')
        }
        this.update_screen();
    }

    tan() {
        if (this.right) {
            this.right = this.convertAngle(this.right);
            this.right = this.eval('Math.tan(' + this.right + ')');
        }
        else {
            this.left = this.convertAngle(this.left);
            this.left = this.eval('Math.tan(' + this.left + ')')
        }
        this.update_screen();
    }

    tentox() {
        this.undoEval();
        if (this.right) {
            this.right = 'Math.pow(10,' + this.right + ')';
        } else {
            this.left = 'Math.pow(10,' + this.left + ')';
        }
        this.update_screen();
    }

    undoEval() {
        if (this.has_eval) {
            this.right = '';
            this.op = '';
            this.has_eval = false;
        }
    }

    log() {
        this.undoEval();
        if (this.shift) {

        }
        else {
            if (this.right) {
                this.left = 'Math.log10(' + this.right + ')'

            } else {
                this.left = 'Math.log10(' + this.left + ')'
            }
        }
        this.update_screen();
    }

    exp() {
        this.undoEval();
        if (this.right) {
            this.r
        }
        Math.expm1
    }

    mod() {

    }

    second() {
        this.shift = !this.shift;
        if(this.shift) {
            document.querySelector("input[value='x^2']").value = 'x^3';
            document.querySelector("input[value='√']").value = '3√';
            document.querySelector("input[value='x^y']").value = 'y√x';
            document.querySelector("input[value='10^x']").value = '2^x';
            document.querySelector("input[value='log']").value = 'ln';
            document.querySelector("input[value='π']").value = 'e';
            document.querySelector("input[value='sin']").value = 'sin-1';
            document.querySelector("input[value='cos']").value = 'cos-1';
            document.querySelector("input[value='tan']").value = 'tan-1';
        } else {
            document.querySelector("input[value='x^3']").value = 'x^2';
            document.querySelector("input[value='3√']").value = '√';
            document.querySelector("input[value='y√x']").value = 'x^y';
            document.querySelector("input[value='2^x']").value = '10^x';
            document.querySelector("input[value='ln']").value = 'log';
            document.querySelector("input[value='e']").value = 'π';
            document.querySelector("input[value='sin-1']").value = 'sin';
            document.querySelector("input[value='cos-1']").value = 'cos';
            document.querySelector("input[value='tan-1']").value = 'tan';
        }
        
    }

    del() {
        if (this.right) {
            this.right = this.right.slice(0, -1);
        }
        else if (this.op) {
            this.op = ''
        }
        else if (this.left) {
            this.left = this.left.slice(0, -1);
        }
        this.update_screen();
    }

    fact(val) {
        if (val < 0) {
            document.getElementById('pantalla').value = 'Error';
            this.op = '';
            this.left = '';
            this.right = '';

        }
        if (val == 0) {
            return 1;
        }
        else {
            return val * this.fact(val - 1);
        }
    }

    factorial() {
        this.undoEval();
        if (this.right) {
            this.right = this.fact(this.right);
        } else {
            this.left = this.fact(this.left);
        }
        this.update_screen();
    }

    left_parentesis() {
        this.undoEval();
        if (this.op) {
            this.right += "("
        }
        else {
            this.left += "(";
        }
        this.open_parentesis++;
        this.update_screen();
    }

    right_parentesis() {
        this.undoEval();
        if (this.open_parentesis !== 0) {
            if (this.op) {
                this.right += ")"
                this.left += this.op + this.right;
                this.right = '';
                this.op = '';
            }
            else {
                this.left += ")";
            }
            this.open_parentesis--;
            this.update_screen();
        }
    }

    pi() {
        this.undoEval();
        if (this.right === "") {
            this.right = Math.PI;
        } else {
            this.left = Math.PI;
        }
        this.update_screen();
    }

}

var calc = new CalculadoraCienfitica();
var ops = ['+', '-', '/', '*'];
document.addEventListener('keydown', function (event) {
    if (event.shiftKey) {
        if (event.key === '+') {
            calc.m_plus();
        }
        else if (event.key === '-') {
            calc.m_minus();
        }
    } else {
        if (!isNaN(event.key) || event.key === '.') {
            calc.numeros(event.key);
        }
        else if (ops.includes(event.key)) {
            calc.operacion(event.key);
        }
        else if (event.key === '=') {
            calc.igual();
        }
        else if (event.key === 's') {
            calc.sqrt();
        }
        else if (event.key === '%') {
            calc.porcentage();
        }
        else if (event.key === 'c') {
            calc.cpress();
        }
        else if (event.key === 'e') {
            calc.cepress();
        }
        else if (event.key === 'm') {
            calc.mrcpress();
        }
    }
});