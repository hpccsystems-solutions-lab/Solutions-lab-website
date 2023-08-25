import React from 'react'
import { Button } from 'antd'
import { navigate } from 'gatsby'

import Layout from "../components/layout/Layout"
import "./index.css"

function learnEcl() {
  return (
    <Layout>
      <div className='learn-ecl'> 
        <h1>ECL Tutorials and ECL playground coming soon.</h1>
        <p> This page is under construction. Come back later</p>
        <div >
          <Button
            type="primary"
            size="large"
            onClick={() => {
              navigate("/");
            }}
          >
            Go home
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default learnEcl