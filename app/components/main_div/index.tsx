export default function MainDiv({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen bg-blue shadow-xl/30 max-w-4xl">
            {children}
        </div>
    );
}