import config from 'config';

import {
	checkUseNewPaymentMethod,
	fillUpeCard,
	setupProductCheckout,
} from '../../utils/payments';
import {
	activatePaymentMethod,
	activateUpe,
	resetSettings,
} from '../../utils/upe-settings';
import { confirmCardAuthentication } from '../../utils/payments';
import { merchant } from '@woocommerce/e2e-utils';
import {
	addNewPaymentMethod,
	removedPaymentMethods,
} from '../../utils/shopper/account';

describe( 'Successfull Purchase', () => {
	beforeAll( async () => {
		await merchant.login();
		await resetSettings();
		await activateUpe();
	} );

	afterAll( async () => {
		// await merchant.logout();
	} );

	// it( 'using a basic card', async () => {
	// 	await activatePaymentMethod( 'card' );
	// 	await setupProductCheckout( config.get( 'addresses.customer.billing' ) );
	// 	await checkUseNewPaymentMethod();
	// 	await fillUpeCard( config.get( 'cards.basic' ) );
	//
	// 	await expect( page ).toClick( '#place_order' );
	// 	await page.waitForNavigation( {
	// 		waitUntil: 'networkidle0',
	// 	} );
	//
	// 	await expect( page ).toMatch( 'Order received' );
	// } );
	//
	// it( 'using a SCA card', async () => {
	// 	await activatePaymentMethod( 'card' );
	// 	await setupProductCheckout( config.get( 'addresses.customer.billing' ) );
	// 	await checkUseNewPaymentMethod();
	// 	await fillUpeCard( config.get( 'cards.sca' ) );
	//
	// 	await expect( page ).toClick( '#place_order' );
	//
	// 	await confirmCardAuthentication();
	// 	await page.waitForNavigation( {
	// 		waitUntil: 'networkidle0',
	// 	} );
	//
	// 	await expect( page ).toMatch( 'Order received' );
	// } );

	it( 'save card', async () => {
		await addNewPaymentMethod( 'basic', config.get( 'cards.basic' ) );

		await expect( page ).toMatch( 'Payment method successfully added' );
	} );

	it( 'use saved card', async () => {
		await removedPaymentMethods();

		await expect( page ).toMatch( 'Payment method deleted.' );
	} );
} );
