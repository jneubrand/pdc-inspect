const list = document.body.querySelector('#main')
const dropEl = document.body.querySelector('#dropzone')

function hexify(a) {
    out = []
    for (let n of a) {
        out.push((n.toString(16).length == 1 ? '0' : '') + n.toString(16))
    }
    return out.join(' ')
}

function textify(a) {
    out = []
    for (let n of a) {
        out.push((n > 32 && n < 127 ? String.fromCharCode(n) : '.'))
    }
    return out.join('')
}

function uintify(a) {
    out = 0
    let exp = 0;
    for (let n of a) {
        out += n * (1 << (exp * 8))
        exp += 1
    }
    return out
}

function loadCommand(f, el) {
    let li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Command Type'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Command Flags'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Stroke Color'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Stroke Width'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Fill Color'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 2)) + '</code> — <code>' +
                   textify(f.slice(0, 2)) + '</code>: PathOpen / Radius'
    f = f.slice(2)
    el.appendChild(li)

    li = document.createElement('li')
    let pointAmount = uintify(f.slice(0, 2))
    li.innerHTML = '<code>' + hexify(f.slice(0, 2)) + '</code> — <code>' +
                   textify(f.slice(0, 2)) + '</code>: NumPoints'
    f = f.slice(2)
    el.appendChild(li)

    let ol = document.createElement('ol')
    el.appendChild(ol)
    for (let i = 0; i < pointAmount; i++) {
        li = document.createElement('li')
        li.innerHTML = '<code>' + hexify(f.slice(0, 4)) + '</code> — <code>' +
        textify(f.slice(0, 4)) + '</code>: Point'
        f = f.slice(4)
        ol.appendChild(li)
    }

    return f
}

function loadCommandList(f, el) {
    let li = document.createElement('li')
    let amt = uintify(f.slice(0, 2))
    console.log(f.slice(0, 2))
    li.innerHTML = '<code>' + hexify(f.slice(0, 2)) + '</code> — <code>' +
                   textify(f.slice(0, 2)) + '</code>: NumCommands'
    f = f.slice(2)
    el.appendChild(li)

    for (let i = 0; i < amt; i++) {
        console.log(i, amt)
        let ul = document.createElement('ul')
        f = loadCommand(f, ul)
        el.appendChild(ul)
    }

    return f
}

function loadFrame(f, el) {
    let li = document.createElement('li')
    let amt = uintify(f.slice(0, 2))
    li.innerHTML = '<code>' + hexify(f.slice(0, 2)) + '</code> — <code>' +
                   textify(f.slice(0, 2)) + '</code>: Duration'
    f = f.slice(2)
    el.appendChild(li)

    let ul = document.createElement('ul')
    f = loadCommandList(f, ul)
    el.appendChild(ul)

    return f
}

function loadFrameList(f, el, amt) {
    for (let i = 0; i < amt; i++) {
        let ol = document.createElement('ol')
        f = loadFrame(f, ol)
        el.appendChild(ol)
    }
}

function loadImage(f, el) {
    let li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Version'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Reserved'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 4)) + '</code> — <code>' +
                   textify(f.slice(0, 4)) + '</code>: View Box ' +
                   'w' + uintify(f.slice(0, 2)) + ' * h' + uintify(f.slice(2, 4))
    f = f.slice(4)
    el.appendChild(li)

    loadCommandList(f, el)
}

function loadSequence(f, el) {
    let li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Version'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 1)) + '</code> — <code>' +
                   textify(f.slice(0, 1)) + '</code>: Reserved'
    f = f.slice(1)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 4)) + '</code> — <code>' +
                   textify(f.slice(0, 4)) + '</code>: View Box ' +
                   'w' + uintify(f.slice(0, 2)) + ' * h' + uintify(f.slice(2, 4))
    f = f.slice(4)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 2)) + '</code> — <code>' +
                   textify(f.slice(0, 2)) + '</code>: Play Count'
    f = f.slice(2)
    el.appendChild(li)

    li = document.createElement('li')
    let amt = uintify(f.slice(0, 2))
    li.innerHTML = '<code>' + hexify(f.slice(0, 2)) + '</code> — <code>' +
                   textify(f.slice(0, 2)) + '</code>: Frame Count'
    f = f.slice(2)
    el.appendChild(li)

    loadFrameList(f, el, amt)
}

function loadFile(f, el) {
    el.innerHTML = ''
    initialF = new Uint8Array(f);
    console.log(initialF.length);
    f = new Uint8Array(f);
    console.log(f)
    let li = document.createElement('li')
    let magicword = textify(f.slice(0, 4))
    li.innerHTML = '<code>' + hexify(f.slice(0, 4)) + '</code> — <code>' +
                   textify(f.slice(0, 4)) + '</code>: Magic Word'
    f = f.slice(4)
    el.appendChild(li)

    li = document.createElement('li')
    li.innerHTML = '<code>' + hexify(f.slice(0, 4)) + '</code> — <code>' +
                   textify(f.slice(0, 4)) + '</code>: File Size ' +
                   ((f[0] + f[1] * (1 << 8) + f[2] * (1 << 16) + f[3] * (1 << 24)
                     == initialF.length - 8)
                    ? '<span class="ok">(correct)</span>'
                    : '<span class="error">(wrong)</span>')
    f = f.slice(4)
    el.appendChild(li)

    if (magicword == 'PDCI') {
        loadImage(f, el)
    } else if (magicword == 'PDCS') {
        loadSequence(f, el)
    }
}

dropEl.addEventListener('dragenter', e => {
    //
})
dropEl.addEventListener('dragover', e => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
})
dropEl.addEventListener('drop', e => {
    e.stopPropagation()
    e.preventDefault()
    if (e.dataTransfer.files.length == 1) {
        console.log('FILES')
        let reader = new FileReader(),
            name = e.dataTransfer.files[0].name
        reader.readAsArrayBuffer(e.dataTransfer.files[0])
        reader.addEventListener('load',
            () => loadFile(reader.result, list))
    }
})
