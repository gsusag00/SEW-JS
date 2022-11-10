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
        if (!this.op) {
            if (this.left === this.memory) {
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
        if (this.right) {
            if (!this.right.includes('.')) {
                this.right += '.';
            }
        } else {
            if (!this.left.includes('.')) {
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
        this.right = '';
        this.point = false;
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

    doCalc() {
        var toEval;
        try {
            toEval = eval(this.left + this.op + this.right);
        } catch (err) {
            this.screen = 'Error';
            document.getElementById('screen').value = this.screen;
        }
        this.left = toEval;
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

var calc = new CalculadoraMilan();
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