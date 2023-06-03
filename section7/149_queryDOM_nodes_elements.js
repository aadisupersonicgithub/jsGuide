/* 

to query, use inbuilt methods on document object

1. querySelector, getElementByID
returns single element, diff ways of querying elements (by css selector, pseudo selector(ie very powerful way to query on DOMs), by IDs, classes)

2. querySelectorAll (not LIVE nodelist), getElementsByTagName() (LIVE nodelist)
returns colllection of elements (arrayLike(not array ) objects aka NodeList) 
    ie possess partial(not all) array behaviour
uses css selector, pseudo, tagName, cssClass etc

// LIVE nodelist ie actual list gets modified (without doing it explicitly)



A. NOTE: Dom nodes are js objects in end ie reference values. 
ie These methods return the object reference(addresses)


5. Nodes and elements

Nodes : objects that make up DOM, 
HTML tags are "element nodes " or just elements
text -> creates "text nodes"
attributes-> creates "attribute nodes"


Elements : are one type of nodes 

-> special properties and methods (vary with kind of elements)
    to intereact with elements to change their style/content
-> can be selected via various diff JS ways 
-> can be created/removed by JS 
 


 */