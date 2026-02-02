# 1. Define the Head and CSS
$head = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ULTIMATE 10K PORTFOLIO</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
    <script src="https://unpkg.com/@studio-freight/lenis@1.0.29/dist/lenis.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #050505; --neon: #00f3ff; }
        body { background: var(--bg); color: white; font-family: 'JetBrains Mono', monospace; margin: 0; overflow-x: hidden; }
        .full-screen { height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; position: relative; }
        .glitch-text { font-size: 5rem; font-weight: 900; text-transform: uppercase; color: var(--neon); text-shadow: 2px 2px 0px #ff00ff; }
        .code-block { font-size: 0.7rem; color: #555; height: 400px; overflow: hidden; white-space: pre; opacity: 0.5; mask-image: linear-gradient(to bottom, black, transparent); }
        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem; }
    </style>
</head>
<body>
"@

# 2. Define the Body Structure
$bodyStart = @"
    <div id="three-bg" style="position:fixed; top:0; left:0; width:100%; height:100vh; z-index:-1;"></div>
    
    <section class="full-screen">
        <div class="text-center z-10">
            <h1 class="glitch-text">SYSTEM OVERLOAD</h1>
            <p>10,000 LINES OF GENERATIVE CODE</p>
        </div>
    </section>

    <section class="container mx-auto py-20">
        <div class="glass mb-10">
            <h2 class="text-3xl font-bold mb-4 text-neon">/// SYSTEM LOGS</h2>
            <div id="log-monitor" class="code-block">
"@

$bodyEndLog = @"
            </div>
        </div>
    </section>

    <div id="react-root"></div>
"@

# 3. Define Scripts (Logic)
$scriptStart = @"
    <script>
        // THREE.JS
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({alpha:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('three-bg').appendChild(renderer.domElement);
        
        const geometry = new THREE.BufferGeometry();
        const count = 3000;
        const pos = new Float32Array(count * 3);
        for(let i=0; i<count*3; i++) pos[i] = (Math.random()-0.5)*20;
        geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const material = new THREE.PointsMaterial({size: 0.02, color: 0x00f3ff});
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
        camera.position.z = 5;
        
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();
    </script>
"@

# --- FILE WRITING ---

$path = "c:\Users\nisha\OneDrive\Desktop\PEP MERN\hello.html"
Set-Content -Path $path -Value $head

# Append Body
Add-Content -Path $path -Value $bodyStart

# GENERATE 5,000 LINES OF "LOGS"
Write-Host "Generating 5000 lines of logs..."
1..5000 | ForEach-Object {
    $hex = -join ((1..8) | ForEach-Object { "{0:X}" -f (Get-Random -Min 0 -Max 15) })
    $line = "<div><span style='color:#333'>[0x$hex]</span> <span style='color:#0f0'>PROCESS_ID_$($_)</span>::EXECUTING_CORE_DUMP_VERIFY_INTEGRITY...OK</div>"
    Add-Content -Path $path -Value $line
}

Add-Content -Path $path -Value $bodyEndLog

# GENERATE HUGE DATA OBJECT
Add-Content -Path $path -Value "<script>"
Add-Content -Path $path -Value "const MEGA_DATA = ["

Write-Host "Generating 4000 lines of JSON data..."
1..4000 | ForEach-Object {
    $val = Get-Random
    $json = "{ id: $_, value: 'hash_$val', status: 'active', matrix: [0, 1, 0, 1], metadata: { complexity: 'maximum', layer: $_ } },"
    Add-Content -Path $path -Value $json
}

Add-Content -Path $path -Value "];"
Add-Content -Path $path -Value "console.log('SYSTEM LOADED ' + MEGA_DATA.length + ' RECORDS');"
Add-Content -Path $path -Value "</script>"

# Append Logic
Add-Content -Path $path -Value $scriptStart
Add-Content -Path $path -Value "</body></html>"

Write-Host "Done! File created at $path"
