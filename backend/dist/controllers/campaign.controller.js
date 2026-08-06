"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignController = void 0;
const campaign_service_1 = require("../services/campaign.service");
const logger_1 = require("../utils/logger");
class CampaignController {
}
exports.CampaignController = CampaignController;
_a = CampaignController;
/**
 * Endpoint to retrieve all campaigns.
 */
CampaignController.getCampaigns = async (req, res, next) => {
    try {
        logger_1.logger.info('Fetching campaigns list...');
        const campaigns = await campaign_service_1.CampaignService.getCampaigns();
        res.status(200).json(campaigns);
    }
    catch (error) {
        logger_1.logger.error('Error fetching campaigns list:', error);
        next(error);
    }
};
/**
 * Endpoint to retrieve a single campaign by ID.
 */
CampaignController.getCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        logger_1.logger.info(`Fetching campaign details for id: ${id}...`);
        const campaign = await campaign_service_1.CampaignService.getCampaignById(id);
        if (!campaign) {
            logger_1.logger.warn(`Campaign not found with id: ${id}`);
            res.status(404).json({ error: 'Campaign not found' });
            return;
        }
        res.status(200).json(campaign);
    }
    catch (error) {
        logger_1.logger.error('Error fetching campaign details:', error);
        next(error);
    }
};
/**
 * Endpoint to create a new campaign.
 */
CampaignController.createCampaign = async (req, res, next) => {
    try {
        logger_1.logger.info('Creating a new campaign...');
        const campaign = await campaign_service_1.CampaignService.createCampaign(req.body);
        res.status(201).json(campaign);
    }
    catch (error) {
        logger_1.logger.error('Error creating campaign:', error);
        next(error);
    }
};
/**
 * Endpoint to update an existing campaign.
 */
CampaignController.updateCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        logger_1.logger.info(`Updating campaign with id: ${id}...`);
        const updatedCampaign = await campaign_service_1.CampaignService.updateCampaign(id, req.body);
        if (!updatedCampaign) {
            logger_1.logger.warn(`Campaign not found for update with id: ${id}`);
            res.status(404).json({ error: 'Campaign not found' });
            return;
        }
        res.status(200).json(updatedCampaign);
    }
    catch (error) {
        logger_1.logger.error('Error updating campaign:', error);
        next(error);
    }
};
/**
 * Endpoint to delete a campaign.
 */
CampaignController.deleteCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        logger_1.logger.info(`Deleting campaign with id: ${id}...`);
        const success = await campaign_service_1.CampaignService.deleteCampaign(id);
        if (!success) {
            logger_1.logger.warn(`Campaign not found for deletion with id: ${id}`);
            res.status(404).json({ error: 'Campaign not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Campaign successfully deleted' });
    }
    catch (error) {
        logger_1.logger.error('Error deleting campaign:', error);
        next(error);
    }
};
/**
 * Endpoint to retrieve campaign statistics.
 */
CampaignController.getCampaignStats = async (req, res, next) => {
    try {
        logger_1.logger.info('Fetching campaign statistics...');
        const stats = await campaign_service_1.CampaignService.getCampaignStats();
        res.status(200).json(stats);
    }
    catch (error) {
        logger_1.logger.error('Error fetching campaign statistics:', error);
        next(error);
    }
};
