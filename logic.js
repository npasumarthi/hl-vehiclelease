'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Asset transaction
 * @param {org.acme.dmi.Trip} trip
 * @transaction
 */
function trip(tx) {
   
    if(tx.type == "O") {
          // Save the old value of the asset.
    var oldValue = tx.asset.user;

    // Update the asset with the new value.
    tx.asset.user = tx.user;
   tx.asset.isAvaible = "N";
    // Get the asset registry for the asset.
    return getAssetRegistry('org.acme.dmi.VehicleAsset')
        .then(function (assetRegistry) {
            // Update the asset in the asset registry.
            return assetRegistry.update(tx.asset);
        })
    }
  else{
   
    // Update the asset with the new value.
    tx.asset.user = null;
    tx.asset.isAvaible = "Y";
    tx.asset.oDoMeter = tx.asset.oDoMeter + tx.totalDistance;
    tx.asset.nooftrips = tx.asset.nooftrips + 1;

    // Get the asset registry for the asset.
    return getAssetRegistry('org.acme.dmi.VehicleAsset')
        .then(function (assetRegistry) {
            // Update the asset in the asset registry.
            return assetRegistry.update(tx.asset);
        })
  }


}

