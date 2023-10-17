import CategorySideMenu from './CategorySideMenu';
import CustomNavbar from './CustomNavbar';

const Base = ({ title = "Welcome to BuzzBlitz", children }) => {
    return (
        <>
            <div className="flex h-screen bg-white">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <CustomNavbar />
                    <div className="flex h-full">
                        <nav className="hidden md:flex w-72 h-full bg-slate-100 border border-gray-300">
                            <CategorySideMenu/>
                        </nav>
                        <main className="flex flex-col w-full  overflow-x-hidden overflow-y-auto mb-14">
                            {children}
                        </main>
                        <nav className="hidden md:flex w-72 h-full bg-yellow-400">
                        </nav>
                    </div>
                </div>
            </div>


        </>
    )
};

export default Base;