import { View, Text } from "@react-pdf/renderer";
import { resumeStyleType } from "../basestyles";
type propsType = {
    title:string;
    styles: resumeStyleType;
    headingtype:number
  };
  
export default function SectionHeading({headingtype,...props}:propsType){
    switch(headingtype){
        case 0: return <SectionHeading0 {...props}/>;
        case 1: return <SectionHeading1 {...props}/>;
        case 2: return <SectionHeading2 {...props}/>;
        case 3: return <SectionHeading3 {...props}/>;
        case 4: return <SectionHeading4 {...props}/>;
        case 5: return <SectionHeading5 {...props}/>;
        case 6: return <SectionHeading6 {...props}/>;
        case 7: return <SectionHeading7 {...props}/>;
        // case 8: return <SectionHeading8 {...props}/>;
        
        default: return <SectionHeading1 {...props}/>

    }
}


export const SectionHeading0 = ({styles,title}:any) =>{
    return(
        <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            
            marginBottom:8
            }}>
        <Text style={[styles.sectionHeader,{fontSize:10,fontWeight:500,
        backgroundColor:"#DADADA",
        textAlign:"left",
        paddingHorizontal:6,
        paddingVertical:2,
        textTransform:"uppercase",
        letterSpacing:2,
        }]}>{title}</Text>
        </View>
    )
}

export const SectionHeading1 = ({styles,title}:any) =>{
    return(
        <View style={{textAlign:"left"}}>
        <Text style={[styles.sectionHeader]}>{title}</Text>
        </View>
    )
}

// export const SectionHeading2 = ({styles,title}:any) =>{
//     return(
//         <View style={{
//             textAlign:"center",
//             paddingBottom:2,
//             borderBottom:"1px solid #ccc",
//             marginBottom:4
//             }}>
//         <Text style={[styles.sectionHeader]}>{title}</Text>
//         </View>
//     )
// }

export const SectionHeading2 = ({styles,title}:any) =>{
    return(
        <View style={{
            paddingBottom:2,
            textTransform:"uppercase",
            fontWeight:600,
            letterSpacing:2,
            marginBottom:4
            }}>
        <Text style={[styles.sectionHeader,{fontSize:10}]}>{title}</Text>
        </View>
    )
}

export const SectionHeading3 = ({styles,title}:any) =>{
    return(
        <View style={{
            backgroundColor:"#DADADA",
            textAlign:"center",
            padding:2,
            textTransform:"uppercase",
            letterSpacing:2,
            fontWeight:600,
            fontSize:10,
            marginBottom:4
            }}>
        <Text style={[styles.sectionHeader,{fontSize:10,}]}>{title}</Text>
        </View>
    )
}

export const SectionHeading4 = ({styles,title}:any) =>{
    return(
        <View style={{
            backgroundColor:"#DADADA",
            textAlign:"center",
            padding:2,
            textTransform:"uppercase",
            letterSpacing:2,
            
            fontSize:10,
            marginBottom:4
            }}>
        <Text style={[styles.sectionHeader,{fontSize:10,fontWeight:500,}]}>{title}</Text>
        </View>
    )
}

export const SectionHeading5 = ({styles,title}:any) =>{
    return(
        <View style={{textAlign:"left"}}>
        <Text style={[styles.sectionHeader,{marginBottom:4}]}>{title}</Text>
        <View style={{height:1,backgroundColor:styles.accentColor,marginBottom:6,width:30}}/>
        </View>
    )
}

export const SectionHeading6 = ({styles,title}:any) =>{
    return(
        <View style={{flexDirection:"row",marginBottom:6,alignItems:"center"}}>
        <View style={{height:12,backgroundColor:styles.accentColor,width:5,marginRight:5}}/>
        <Text style={[styles.sectionHeader]}>{title}</Text>
        </View>
    )
}

export const SectionHeading7 = ({styles,title}:any) =>{
    return(
        <View style={{
            position:"relative",
            marginBottom:8
            }}>
                <View style={{
                    position:"absolute",
                    left:0,
                    top:8,
                    width:"100%",
                    height:0.5,
                    backgroundColor:"#777"
                }}/>

<View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            }}>
        <Text style={[styles.sectionHeader,{fontSize:10,fontWeight:500,
        backgroundColor:styles.bodyColor,
        textAlign:"left",
        paddingHorizontal:6,
        marginLeft:10,
        paddingVertical:2,
        textTransform:"uppercase",
        letterSpacing:2,
        }]}>{title}</Text>
        </View>
        
        </View>
    )
}
