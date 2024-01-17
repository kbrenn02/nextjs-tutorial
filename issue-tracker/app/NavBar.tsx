'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsFillBugFill } from "react-icons/bs"; // google search react icons. click the github link, copy the import 
// from the website and include here. Then call the <BsFillBugFill /> item in the link
import classnames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <nav className = "flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            {/* flex allows for horizontal alignment of elements. space-x-6 is space between items. border-b is bottom border.
            mb-5 is a margin at the bottom. h-14 is a heigh of the element. items-center vertically centers the elements */}
            
            <Link href="/"><BsFillBugFill /></Link>

            <ul className="flex space-x-6">
                {/* because we know we'll have multiple links, we created an array that contains the link 
                label and the href, then we mapped to the array so we could apply the same code (namely className) 
                to all links, changing the href and label dynamically by using curly brackets {} to input the info*/}
                {links.map(link => 
                    <Link 
                        key={link.href} 
                        // the ${} allows us to use if statements. This, said another way, is
                        // if link.href == currentPath, make the text zinc-900, else make the text zinc-500
                        // This will make it so that the current page is highlighted a different color
                        // A fun way to style the active link
                        // className = {`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                        
                        // using the classnames import, we are able to make our code cleaner. This says that styling on the
                        // left of the colon will only occur if the statement on the right of the colon is true
                        className={classnames({
                            'text-zinc-900' : link.href === currentPath,
                            'text-zinc-500' : link.href !== currentPath,
                            'hover:text-zinc-800 transition-colors' : true
                        })}
                        href={link.href}>{link.label}
                    </Link>)}
            </ul>
        </nav>
    )
}

export default NavBar