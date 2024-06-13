import CreateListing from './CreateListing'
import Property from './Property'
import './PropertyContainer.css'

const PropertyContainer = () => {
  return (
    <div className='property-container'>
      <CreateListing/>
      <div className="property-listing">
        <Property />
      </div>
    </div>
  )
}

export default PropertyContainer