import { FC, useState, ReactNode, useRef, useEffect } from "react";
import classes from "./classes.module.css"
import HeaderMenuPortal from './portal'

type TooltipProps = {
    children: ReactNode;
    content?: ReactNode;
    display?: boolean;
    displayType?: string;
    
};


const ToolTip: FC<TooltipProps> = ({ children, content, display = true, displayType, ...props }) => {
    const [visible, setVisibility] = useState<boolean>(false)
    const [styles, setStyles] = useState<Object>({})
    const tooltipRef = useRef<HTMLDivElement>(null!)
    
    console.log("show is : "  , display)
    
    const show = () => {
        const style = { left: 0, top: 0 };

        const dimensions = tooltipRef.current.getBoundingClientRect();

        // center align the tooltip by taking both the target and tooltip widths into account
        style.left = (dimensions.left - 25 + (dimensions.width / 2));
        style.left = Math.min(style.left, document.body.clientWidth); // or off the right

        style.top = (dimensions.top + dimensions.height) - 20;

        setVisibility(true)
        setStyles(style)
    }

    // useEffect(() => {
    //     tooltipRef.current.addEventListener("click", hide, { capture: true });
    // }, [])

    const hide = () => {
        console.log("hide")
        setVisibility(false)
        setStyles({})
    }

    if (!display) {
        return <span>{children}</span>;
    }

    return (
        <span
            onMouseEnter={show}
            onMouseLeave={hide}
            ref={tooltipRef}
            className="cursor-pointer"
        >
            {children}
            {visible &&
                <HeaderMenuPortal>
                    <div onClick={hide} style={styles} className={classes.tooltip}>
                        {content}
                    </div>
                </HeaderMenuPortal>
            }
        </span>
    );
}

export default ToolTip;