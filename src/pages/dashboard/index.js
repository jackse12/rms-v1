import React from 'react'
import FeatureFunc from "@/component/familyChartFunc"
import withAuth from '@/hoc/withAuth'
function FeatureFuncIndex() {
  return (
    <div><FeatureFunc /></div>
  )
}

export default withAuth(FeatureFuncIndex) 