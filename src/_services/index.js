import { gdaxPublicApiService } from './gdaxPublicApi.service';
import { gdaxPrivateApiService } from './gdaxPrivateApi.service';

const gdaxService = {
  ...gdaxPublicApiService,
  ...gdaxPrivateApiService
};

export { gdaxPublicApiService, gdaxPrivateApiService, gdaxService };
