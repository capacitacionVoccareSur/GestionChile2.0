import { Droplets } from "lucide-react";

const size = 20;
const dim = size * 2.2;

function Label({ children }: { children: string }) {
  return <p className="mt-2 text-xs font-medium text-gray-500 text-center">{children}</p>;
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-10 py-16 px-8">
      <h1 className="text-lg font-bold text-gray-700 tracking-wide">Comparativa de estilos de íconos</h1>

      <div className="flex flex-wrap justify-center gap-10">

        {/* 1. Gradiente + luz (actual anterior) */}
        <div className="flex flex-col items-center">
          <div
            className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 shadow-xl shadow-blue-500/50"
            style={{ width: dim, height: dim }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
            <Droplets size={size} className="relative text-white drop-shadow" strokeWidth={1.75} />
          </div>
          <Label>1. Gradiente + luz</Label>
        </div>

        {/* 2. Glassmorphism (actual) */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl backdrop-blur-sm bg-blue-500/20 border border-blue-400/30 shadow-md shadow-blue-300/30"
            style={{ width: dim, height: dim }}
          >
            <Droplets size={size} className="text-blue-600" strokeWidth={1.75} />
          </div>
          <Label>2. Glassmorphism</Label>
        </div>

        {/* 3. Soft / Pastel */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl bg-blue-100"
            style={{ width: dim, height: dim }}
          >
            <Droplets size={size} className="text-blue-600" strokeWidth={1.75} />
          </div>
          <Label>3. Soft / Pastel</Label>
        </div>

        {/* 4. Outline con borde de color */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl bg-white border-2 border-blue-500"
            style={{ width: dim, height: dim }}
          >
            <Droplets size={size} className="text-blue-500" strokeWidth={1.75} />
          </div>
          <Label>4. Outline</Label>
        </div>

        {/* 5. Monochrome */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl bg-gray-100"
            style={{ width: dim, height: dim }}
          >
            <Droplets size={size} className="text-gray-600" strokeWidth={1.75} />
          </div>
          <Label>5. Monochrome</Label>
        </div>

        {/* 6. Neumorphism gris */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl bg-gray-100"
            style={{
              width: dim,
              height: dim,
              boxShadow: "4px 4px 10px #c8cdd5, -4px -4px 10px #ffffff",
            }}
          >
            <Droplets size={size} className="text-gray-500" strokeWidth={1.75} />
          </div>
          <Label>6. Neumorphism</Label>
        </div>

        {/* 6b. Neumorphism con color — azul */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: dim,
              height: dim,
              background: "#dbeafe",
              boxShadow: "4px 4px 10px #93c5fd, -4px -4px 10px #ffffff",
            }}
          >
            <Droplets size={size} className="text-blue-600" strokeWidth={1.75} />
          </div>
          <Label>6b. Neuo + color azul</Label>
        </div>

        {/* 6c. Neumorphism con color — naranja */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: dim,
              height: dim,
              background: "#ffedd5",
              boxShadow: "4px 4px 10px #fdba74, -4px -4px 10px #ffffff",
            }}
          >
            <Droplets size={size} className="text-orange-600" strokeWidth={1.75} />
          </div>
          <Label>6c. Neuo + color naranja</Label>
        </div>

        {/* 6d. Neumorphism con color — verde */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: dim,
              height: dim,
              background: "#d1fae5",
              boxShadow: "4px 4px 10px #6ee7b7, -4px -4px 10px #ffffff",
            }}
          >
            <Droplets size={size} className="text-emerald-600" strokeWidth={1.75} />
          </div>
          <Label>6d. Neuo + color verde</Label>
        </div>

        {/* 7. Gradiente oscuro (estilo Vercel/Linear) */}
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl bg-gray-900 border border-gray-700 shadow-lg shadow-black/30"
            style={{ width: dim, height: dim }}
          >
            <Droplets size={size} className="text-blue-400" strokeWidth={1.75} />
          </div>
          <Label>7. Dark / Linear</Label>
        </div>

      </div>

      <p className="text-xs text-gray-400">Todos usan el mismo ícono — Droplets (Plomería)</p>
    </div>
  );
}
