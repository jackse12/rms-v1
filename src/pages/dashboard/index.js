import React, { useEffect, useState } from 'react'
import FeatureFunc from "@/component/familyChartFunc"
import withAuth from '@/hoc/withAuth'
import axios from 'axios';
import _ from 'lodash';

function FeatureFuncIndex() {

  const [dataTree, setDataTree] = useState(null)

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3000/api/services/familydata');

      setDataTree(_.get(response, "data.data"))
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div>{dataTree ? <FeatureFunc dataJson={dataTree} /> : <></>}</div>
  )
}

export default withAuth(FeatureFuncIndex)

