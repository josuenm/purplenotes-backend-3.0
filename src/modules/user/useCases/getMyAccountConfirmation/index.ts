import { GetMyAccountConfirmationController } from "./getMyAccountConfirmationController";
import { GetMyAccountConfirmationUseCase } from "./getMyAccountConfirmationUseCase";

const useCase = new GetMyAccountConfirmationUseCase();
const controller = new GetMyAccountConfirmationController(useCase);

export { controller as getMyAccountConfirmationController };
