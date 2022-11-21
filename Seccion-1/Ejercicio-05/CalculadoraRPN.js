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
    f_e = false;

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

    resta() {
        if (this.op === 'e+') {
            this.op = 'e-';
            this.update_screen();
        }
        else {
            super.resta();
        }
    }

    suma() {
        if (this.op === 'e-') {
            this.op = 'e+';
            this.update_screen();
        }
        else {
            super.suma();
        }
    }

    deg() {
        if (this.trig === 'DEG') {
            this.trig = 'RAD';
            document.querySelector("input[value='DEG']").value = 'RAD'
        }
        else if (this.trig === 'RAD') {
            this.trig = 'GRAD';
            document.querySelector("input[value='RAD']").value = 'GRAD'
        }
        else {
            this.trig = 'DEG';
            document.querySelector("input[value='GRAD']").value = 'DEG'
        }
    }

    hyp() {
        this.hypr = !this.hypr

        if (this.hypr) {
            if (this.shift) {
                document.querySelector("input[value='asin']").value = 'asinh';
                document.querySelector("input[value='acos']").value = 'acosh';
                document.querySelector("input[value='atan']").value = 'atanh';
            } else {
                document.querySelector("input[value='sin']").value = 'sinh';
                document.querySelector("input[value='cos']").value = 'cosh';
                document.querySelector("input[value='tan']").value = 'tanh';
            }
        } else {
            if (this.shift) {
                document.querySelector("input[value='asinh']").value = 'asin';
                document.querySelector("input[value='acosh']").value = 'acos';
                document.querySelector("input[value='atanh']").value = 'atan';
            } else {
                document.querySelector("input[value='sinh']").value = 'sin';
                document.querySelector("input[value='cosh']").value = 'cos';
                document.querySelector("input[value='tanh']").value = 'tan';
            }

        }
    }

    fe() {
        if (this.has_eval) {
            this.undoEval();
            this.has_eval = true;
        }
        this.f_e = !this.f_e;
        if (this.f_e) {
            var numb;
            if (this.right) {
                numb = Number(this.right);
                this.right = numb.toExponential();
            } else {
                numb = Number(this.left);
                this.left = numb.toExponential();
            }
        } else {
            if (this.right) {
                this.right = this.eval(this.right);
            } else {
                this.left = this.eval(this.left);
            }
        }
        this.update_screen();
    }

    mc() {
        this.memory = 0;
    }

    mr() {
        if (this.right) {
            this.right = this.memory;
        } else {
            this.left = this.memory;
        }
        this.update_screen();
    }

    ms() {
        if (this.right) {
            this.memory = this.eval(this.right);
        }
        else {
            this.memory = this.eval(this.left);
        }
    }

    square() {
        this.undoEval();
        this.has_eval = true;
        var exp = 2;
        if (this.shift) {
            exp = 3;
        }
        if (this.right) {
            this.right = 'Math.pow(' + this.right + ',' + exp + ')'
        } else {
            this.left = 'Math.pow(' + this.left + ',' + exp + ')'
        }
        this.update_screen();
    }

    sqrt() {
        this.undoEval();
        var form = 'Math.sqrt('
        if (this.shift) {
            form = 'Math.cbrt('
        }
        if (this.right) {
            this.right = this.eval(form + this.right + ')');
        }
        else {
            this.left = this.eval(form + this.left + ')');
        }
        this.update_screen();
    }

    xtoy() {
        var power = '**'
        if (this.shift) {
            power = '** (1/'
            this.open_parentesis++;
        }
        if (this.right) {
            this.left += this.op + this.right;
            this.right = '';
        }
        this.op = power;
        this.update_screen();
    }


    convertAngleToRad(val) {
        if (this.trig === 'DEG') {
            return val * Math.PI / 180;
        } else if (this.trig === 'GRAD') {
            return val * Math.PI / 200;
        }
        return val;
    }

    convertRadToAngle(val) {
        if (this.trig === 'DEG') {
            return val * 180 / Math.PI;
        } else if (this.trig === 'GRAD') {
            return val * 200 / Math.PI;
        }
        return val;
    }

    sin() {
        var sine = 'Math.sin'
        if (this.shift) {
            sine = 'Math.asin'
        }
        if (this.hypr) {
            sine += 'h'
        }
        sine += '('
        if (this.right) {
            if (!this.shift) {
                this.right = this.convertAngleToRad(this.right);
            }
            this.right = this.eval(sine + this.right + ')');
            if (this.shift) {
                this.right = this.convertRadToAngle(this.right)
            }
        }
        else {
            if (!this.shift) {
                this.left = this.convertAngleToRad(this.left);
            }
            this.left = this.eval(sine + this.left + ')')
            if (this.shift) {
                this.left = this.convertRadToAngle(this.left);
            }
        }
        this.update_screen();
    }

    cos() {
        var cosi = 'Math.cos'
        if (this.shift) {
            cos = 'Math.acos'
        }
        if (this.hypr) {
            cosi += 'h'
        }
        cosi += '('
        if (this.right) {
            if (!this.shift) {
                this.right = this.convertAngleToRad(this.right);
            }
            this.right = this.eval(cosi + this.right + ')');
            if (this.shift) {
                this.right = this.convertRadToAngle(this.right);
            }
        }
        else {
            if (!this.shift) {
                this.left = this.convertAngleToRad(this.left);
            }
            this.left = this.eval(cosi + this.left + ')');
            if (this.shift) {
                this.left = this.convertRadToAngle(this.left);
            }
        }
        this.update_screen();
    }

    tan() {
        var tani = 'Math.tan'
        if (this.shift) {
            tani = 'Math.atan'
        }
        if (this.hypr) {
            tani += 'h'
        }
        tani += '('
        if (this.right) {
            if (!this.shift) {
                this.right = this.convertAngleToRad(this.right);
            }
            this.right = this.eval(tani + this.right + ')');
            if (this.shift) {
                this.right = this.convertRadToAngle(this.right);
            }
        }
        else {
            if (!this.shift) {
                this.left = this.convertAngleToRad(this.left);
            }
            this.left = this.eval(tani + this.left + ')');
            if (this.shift) {
                this.left = this.convertRadToAngle(this.left);
            }
        }
        this.update_screen();
    }

    tentox() {
        this.undoEval();
        var not = 'Math.pow(10,';
        if (this.shift) {
            not = 'Math.pow(2,'
        }
        if (this.right) {
            this.right = not + this.right + ')';
        } else {
            this.left = not + this.left + ')';
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
        var loga = 'Math.log10('
        if (this.shift) {
            Math.log()
            loga = 'Math.log('
        }
        if (this.right) {
            this.left = loga + this.right + ')'

        } else {
            this.left = loga + this.left + ')'
        }
        this.update_screen();
    }

    exp() {
        this.operacion('e+')
    }

    mod() {
        this.operacion('%');
    }

    second() {
        this.shift = !this.shift;
        if (this.shift) {
            document.querySelector("input[value='x^2']").value = 'x^3';
            document.querySelector("input[value='√']").value = '3√';
            document.querySelector("input[value='x^y']").value = 'y√x';
            document.querySelector("input[value='10^x']").value = '2^x';
            document.querySelector("input[value='log']").value = 'ln';
            document.querySelector("input[value='π']").value = 'e';
            if (this.hypr) {
                document.querySelector("input[value='sinh']").value = 'asinh';
                document.querySelector("input[value='cosh']").value = 'acosh';
                document.querySelector("input[value='tanh']").value = 'atanh';
            } else {
                document.querySelector("input[value='sin']").value = 'asin';
                document.querySelector("input[value='cos']").value = 'acos';
                document.querySelector("input[value='tan']").value = 'atan';
            }

        } else {
            document.querySelector("input[value='x^3']").value = 'x^2';
            document.querySelector("input[value='3√']").value = '√';
            document.querySelector("input[value='y√x']").value = 'x^y';
            document.querySelector("input[value='2^x']").value = '10^x';
            document.querySelector("input[value='ln']").value = 'log';
            document.querySelector("input[value='e']").value = 'π';
            if (this.hypr) {
                document.querySelector("input[value='asinh']").value = 'sinh';
                document.querySelector("input[value='acosh']").value = 'cosh';
                document.querySelector("input[value='atanh']").value = 'tanh';
            } else {
                document.querySelector("input[value='asin']").value = 'sin';
                document.querySelector("input[value='acos']").value = 'cos';
                document.querySelector("input[value='atan']").value = 'tan';
            }
        }

    }

    del() {
        if (this.right) {
            this.right = this.right.slice(0, -1);
        }
        else if (!this.op) {
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
        this.has_eval = true;
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
        var val = Math.PI;
        if (this.shift) {
            val = Math.E
        }
        if (this.right) {
            this.right = val.toString();
        } else {
            this.left = val.toString();
        }
        this.update_screen();
    }

}

class CalculadoraRPN extends CalculadoraCienfitica {

    pila = new Pila();


    constructor() {
        super();
    }

    digito(x) {
        super.digito(x);
    }

    igual() {
        this.pila.push(this.left)
        this.updateTA();
    }

    operacion(val) {
        if (this.pila.size() >= 2) {
            var op2 = this.pila.pop();
            var op1 = this.pila.pop();
            var res;
            if (val === '+') {
                res = Number(op1) + Number(op2);

            } else if (val === '-') {
                res = Number(op1) - Number(op2);
            } else if (val === '*') {
                res = Number(op1) * Number(op2);
            } else {
                res = Number(op1) / Number(op2);
            }
            this.pila.push(res);
            this.updateTA();
        }
    }

    square() {
        var exp = 2;
        if (this.shift) {
            exp = 3
        }
        var val;
        if (this.left) {
            val = Math.pow(this.left, exp);
        } else {
            var val = this.pila.pop();
            val = Math.pow(val, exp);
        }
        this.pila.push(val);
        this.updateTA();
    }

    sqrt() {
        var func = Math.sqrt;
        if (this.shift) {
            func = Math.cbrt;
        }
        var val;
        if (this.left) {
            val = func(this.left);
            this.pila.push(val);
        } else {
            var val = this.pila.pop();
            val = func(val);
            this.pila.push(val);
        }
        this.updateTA();
    }

    tentox() {
        var num = 10;
        if (this.shift) {
            num = 2;
        }
        var val;
        if (this.left) {
            val = Math.pow(num, this.left);
        } else {
            var val = this.pila.pop();
            val = Math.pow(num, val);
        }
        this.pila.push(val);
        this.updateTA();
    }

    log() {
        var func = Math.log10;
        if (this.shift) {
            func = Math.log;
        }
        var val;
        if (this.left) {
            val = func(this.left);
        } else {
            val = this.pila.pop();
            val = func(val);
        }
        this.pila.push(val);
        this.updateTA();
    }

    factorial() {
        var val;
        if (this.left) {
            val = this.fact(this.left);
        } else {
            val = this.pila.pop();
            val = this.fact(val);
        }
        this.pila.push(val);
        this.updateTA();
    }

    trig_op(func) {
        var val;
        if (this.left) {
            val = this.left;
            if (!this.shift && !this.hypr) {
                val = this.convertAngleToRad(val)
            }
            val = func(val);
            if (this.shift && this.hypr) {
                val = this.convertRadToAngle(val)
            }
        } else {
            val = this.pila.pop();
            if (!this.shift && !this.hypr) {
                val = this.convertAngleToRad(val)
            }
            val = func(val);
            if (!(this.shift && this.hypr)) {
                val = this.convertRadToAngle(val)
            }
        }
        
        this.pila.push(val);
    }

    sin() {
        var func = Math.sin;
        if (this.shift && this.hypr) {
            func = Math.asinh;
        } else if (this.shift) {
            func = Math.asin;
        } else if (this.hypr) {
            func = Math.sinh;
        }
        this.trig_op(func)
        this.updateTA();
    }

    cos() {
        var func = Math.cos;
        if (this.shift && this.hypr) {
            func = Math.acosh;
        } else if (this.shift) {
            func = Math.acos;
        } else if (this.hypr) {
            func = Math.cosh;
        }
        this.trig_op(func)
        this.updateTA();
    }

    tan() {
        var func = Math.tan;
        if (this.shift && this.hypr) {
            func = Math.atanh;
        } else if (this.shift) {
            func = Math.atan;
        } else if (this.hypr) {
            func = Math.tanh;
        }
        this.trig_op(func)
        this.updateTA();
    } 

    exp() {
        if(this.pila.size() >= 2) {
            var op2 = this.pila.pop();
            var op1 = this.pila.pop();
            var res = Number(op1) * Math.pow(10,op2)
            this.pila.push(res)
        }
        this.updateTA();
    }

    mod() {
        if(this.pila.size() >= 2) {
            var op2 = this.pila.pop();
            var op1 = this.pila.pop();
            var res = Number(op1) % Number(op2)
            this.pila.push(res)
        }
        this.updateTA();
    }

    updateTA() {
        document.getElementById('pila').innerHTML = this.pila.print();
        document.getElementById('pantalla').value = '';
        this.left = ''
    }

    cpress() {
        this.pila.clear();
        this.updateTA();
    }
}

class Pila {

    stack = [];

    constructor() {
    }

    pop() {
        return this.stack.pop();
    }

    push(val) {
        this.stack.push(val);
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    size() {
        return this.stack.length;
    }

    get(pos) {
        if (pos >= 0 && pos < this.stack.length) {
            return this.stack[pos];
        }
    }

    print() {

        var toprint = ""
        var pos = this.stack.length;
        for (var i = this.stack.length - 1; i >= 0; i--) {
            toprint += this.printline(i, pos)
            pos--;
        }
        return toprint;
    }

    printline(item, pos) {
        var realpos = this.stack.length - 1 - item;
        return '\n' + Number(pos) + ':\t' + this.stack[realpos]
    }

    clear() {
        this.stack = [];
    }
}



var calc = new CalculadoraRPN();
var ops = ['+', '-', '/', '*'];
document.addEventListener('keydown', function (event) {
    console.log('Control: ' + event.ctrlKey + ', Shift: ' + event.shiftKey + ', Key: ' + event.key);
    if (event.shiftKey) {
        if (event.key === '+') {
            calc.m_plus();
        }
        else if (event.key === '-') {
            calc.m_minus();
        } else if (event.key === '(') {
            calc.left_parentesis();
        } else if (event.key === ')') {
            calc.right_parentesis();
        } else if (event.key === 'C') {
            calc.mc();
        } else if (event.key === '=') {
            calc.igual();
        } else if (event.key === '^^') {
            calc.xtoy();
        } else if (event.key === 'D') {
            calc.deg();
        } else if (event.key === 'H') {
            calc.hyp();
        } else if (event.key === 'F') {
            calc.fe();
        } else if(event.key === 'ArrowRight') {
            calc.changesign();
        }
    } else {
        if (!isNaN(event.key) || event.key === '.') {
            calc.numeros(event.key);
        }
        else if (ops.includes(event.key)) {
            calc.operacion(event.key);
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
        } else if (event.key === 'Backspace') {
            calc.del();
        } else if (event.ctrlKey) {
            calc.second();
        } else if (event.key === 'r') {
            calc.mr();
        } else if (event.key === 'p') {
            calc.pi();
        } else if (event.key === 's') {
            calc.ms();
        } else if (event.key === 'o') {
            calc.cos();
        } else if (event.key === 'i') {
            calc.sin();
        } else if (event.key === 't') {
            calc.tan();
        } else if (event.key === 'x') {
            calc.exp();
        } else if (event.key === 'd') {
            calc.mod();
        } else if (event.key === 'l') {
            calc.log();
        } else if (event.key === 'f') {
            calc.factorial();
        } else if (event.key === '^2') {
            calc.square();
        } else if (event.key === '^x') {
            calc.tentox();
        }
    }
});