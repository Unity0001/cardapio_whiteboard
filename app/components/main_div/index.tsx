export default function MainDiv({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen bg-black shadow-xl/30  max-w-4xl">
            <div className="bg-white h-1/3 justify-end">
                {children}
            </div>
        </div>
    );
}