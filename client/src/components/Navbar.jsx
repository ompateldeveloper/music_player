export default function Navbar() {
    return (
        <div className="Navbar h-12 flex items-center justify-between ">
            <div className="title text-lg ml-4 font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-br via-purple-400  from-blue-100 to-violet-100 dancing-script uppercase">Chord</div>
            <button className="signup dark:text-zinc-100 mr-4 rounded-md  bg-gradient-to-br via-purple-600  from-blue-100 to-violet-600 text-sm ">
                <div className="inner m-px dark:bg-zinc-900 rounded-md px-2 py-1">
                    sign up
                </div>
            </button>

        </div>
    )
}
