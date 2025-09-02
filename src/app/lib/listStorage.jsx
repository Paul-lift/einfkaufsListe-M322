import { useEffect, useState, useRef } from "react";

export default function ListStorage() {
  const [lists, setLists] = useState([]);
  const listIdRef = useRef(0);
    



  return { lists };
}
